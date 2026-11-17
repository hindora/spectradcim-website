#!/usr/bin/env bash
# One-time setup on a VM that ALREADY runs nginx for other sites (e.g. rr-dev).
# Run ON THE VM as a user with sudo:   bash setup-vm-nginx.sh example.com
# Adds ONE new nginx site for the domain and gets a Let's Encrypt certificate with
# certbot in webroot mode. It does not edit or remove any existing site file, and
# nginx is only reloaded after "nginx -t" passes.
# Before running: the domain's A record must already point at this VM, and the
# firewall must allow TCP 80 and 443, or the certificate request fails.
# Use setup-vm.sh (Caddy) instead on a fresh VM with nothing on ports 80/443.
set -euo pipefail

DOMAIN="${1:?usage: bash setup-vm-nginx.sh <domain, e.g. example.com>}"
WEBROOT=/var/www/spectradcim
ACME=$WEBROOT/acme
DEPLOY_USER="${SUDO_USER:-$USER}"
SITE=/etc/nginx/sites-available/spectradcim
LINK=/etc/nginx/sites-enabled/spectradcim
HEADERS=/etc/nginx/snippets/spectradcim-headers.conf
MARK='Managed by deploy/setup-vm-nginx.sh'

[ -x /usr/sbin/nginx ] || { echo "nginx is not installed here. Use setup-vm.sh on a fresh VM."; exit 1; }
for f in "$SITE" "$HEADERS"; do
  if [ -e "$f" ] && ! sudo grep -q "$MARK" "$f"; then
    echo "$f exists and was not written by this script. Not overwriting."; exit 1
  fi
done
if sudo grep -rlE "server_name[^;]*[[:space:]](www\.)?${DOMAIN//./\\.}[[:space:];]" /etc/nginx/sites-enabled 2>/dev/null | grep -v "^$LINK$"; then
  echo "Another enabled site already answers for $DOMAIN (listed above). Stopping."; exit 1
fi

# The certificate request fails unless the name points here. If it does not yet, the site
# is set up on port 80 only (no certificate, no redirect); run this script again once the
# A record points here and it adds the certificate and switches to HTTPS.
MYIP=$(curl -s -m 5 ifconfig.me || true)
DNSIP=$(getent ahostsv4 "$DOMAIN" | awk 'NR==1{print $1}' || true)
NAMES="$DOMAIN www.$DOMAIN"; CERT_ARGS=(-d "$DOMAIN"); PREDNS=0
if [ "$DNSIP" != "$MYIP" ]; then
  PREDNS=1
  echo "$DOMAIN resolves to '${DNSIP:-nothing}', this VM is $MYIP: setting up WITHOUT a certificate for now."
elif [ "$(getent ahostsv4 "www.$DOMAIN" | awk 'NR==1{print $1}' || true)" = "$MYIP" ]; then
  CERT_ARGS+=(-d "www.$DOMAIN")
else
  NAMES="$DOMAIN"
  echo "www.$DOMAIN does not point here: serving $DOMAIN only."
fi

if [ "$PREDNS" = 0 ]; then
  sudo apt-get update
  sudo apt-get install -y certbot
fi

# Web root: releases/<timestamp> plus a "current" link, so a deploy switches in one step.
sudo mkdir -p "$WEBROOT/releases" "$ACME"
sudo chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$WEBROOT"

# nginx drops server-level add_header lines inside any location that has its own,
# so the headers live in one file that every location includes.
sudo tee "$HEADERS" >/dev/null <<EOF
# $MARK in the spectradcim-website repo.
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" always;
EOF

CONTENT=$(cat <<'EOF'
    root @WEBROOT@/current;
    index index.html;
    error_page 404 /404.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml text/plain application/xml;

    access_log /var/log/nginx/spectradcim.access.log;
    error_log  /var/log/nginx/spectradcim.error.log;

    # Hashed build files never change; pictures may be replaced under the same name.
    location /_astro/ {
        include @HEADERS@;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    location ~ ^/(bg|shots|brand)/|^/favicon\.png$ {
        include @HEADERS@;
        add_header Cache-Control "public, max-age=86400";
    }
    location / {
        include @HEADERS@;
        try_files $uri $uri/index.html =404;
    }
EOF
)

write_site() {  # $1 = plain (port 80 serves the site) | http (port 80 redirects) | https (full)
  local tmp; tmp=$(mktemp)
  cat >"$tmp" <<'EOF'
# @MARK@ in the spectradcim-website repo.
server {
    listen 80;
    listen [::]:80;
    server_name @NAMES@ @IP@;
    server_tokens off;

    # The bare IP is answered here too (it shows the site before DNS, and redirects after).
    location ^~ /.well-known/acme-challenge/ { root @ACME@; }
EOF
  if [ "$1" = plain ]; then
    printf '%s
}
' "$CONTENT" >>"$tmp"
  else
    printf '    location / { return 301 https://@DOMAIN@$request_uri; }
}
' >>"$tmp"
  fi
  if [ "$1" = https ]; then
    cat >>"$tmp" <<'EOF'

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name @NAMES@;
    server_tokens off;

    ssl_certificate     /etc/letsencrypt/live/@DOMAIN@/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/@DOMAIN@/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:spectradcim:5m;
    ssl_session_timeout 1d;

    if ($host != "@DOMAIN@") { return 301 https://@DOMAIN@$request_uri; }

EOF
    printf '%s
}
' "$CONTENT" >>"$tmp"
  fi
  sed -i -e "s|@MARK@|$MARK|g" -e "s|@NAMES@|$NAMES|g" -e "s|@IP@|$MYIP|g" -e "s|@DOMAIN@|$DOMAIN|g" \
         -e "s|@ACME@|$ACME|g" -e "s|@WEBROOT@|$WEBROOT|g" -e "s|@HEADERS@|$HEADERS|g" "$tmp"
  sudo install -m 644 "$tmp" "$SITE"; rm -f "$tmp"
  sudo ln -sfn "$SITE" "$LINK"
  if ! sudo nginx -t; then
    echo "nginx rejected the new site. Removing it; the other sites are untouched and nginx was not reloaded."
    sudo rm -f "$LINK"; exit 1
  fi
  sudo systemctl reload nginx
}

if [ "$PREDNS" = 1 ]; then
  write_site plain
  echo "Set up on port 80 only. Web root: $WEBROOT (owned by $DEPLOY_USER)."
  echo "Run deploy/deploy.sh from your PC, then check:  curl -sI -H 'Host: $DOMAIN' http://$MYIP/"
  echo "After the A record points at $MYIP, run this script again to add the certificate."
  exit 0
fi

# Step 1: keep serving on port 80 while the certificate challenge is answered.
if ! sudo test -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem"; then
  [ -e "$LINK" ] || write_site plain
  sudo certbot certonly --webroot -w "$ACME" "${CERT_ARGS[@]}"     --non-interactive --agree-tos --register-unsafely-without-email     --deploy-hook "systemctl reload nginx"
fi

# Step 2: the full HTTPS site. Renewal runs from certbot's own systemd timer.
write_site https
echo "Setup done for: $NAMES. Web root: $WEBROOT (owned by $DEPLOY_USER)."
echo "If the site is not uploaded yet, run deploy/deploy.sh from your PC."
