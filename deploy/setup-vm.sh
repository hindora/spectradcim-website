#!/usr/bin/env bash
# One-time setup of a fresh Debian/Ubuntu VM to serve the SpectraDCIM site.
# Run ON THE VM as a user with sudo:   bash setup-vm.sh example.com
# Installs Caddy (web server with automatic HTTPS certificates and renewal),
# creates the web root, and writes the site config.
# Before running: the domain's A records must already point at this VM, and
# the VM's firewall must allow TCP 80 and 443, or the certificate request fails.
set -euo pipefail

DOMAIN="${1:?usage: bash setup-vm.sh <domain, e.g. example.com>}"
WEBROOT=/var/www/spectradcim
DEPLOY_USER="${SUDO_USER:-$USER}"

# Safety: this script is for a VM with nothing else on the web ports. If another web server or
# proxy already listens on 80/443, or a Caddy config already exists, stop and do it by hand
# (add this site to the existing server instead; see deploy/README.md).
if sudo ss -ltnp 2>/dev/null | grep -E ':(80|443)\s' >/dev/null; then
  echo "Ports 80/443 are already in use on this VM:"; sudo ss -ltnp | grep -E ':(80|443)\s'
  echo "Not touching anything. Add the site to the existing web server instead."; exit 1
fi
if [ -s /etc/caddy/Caddyfile ] && ! grep -q 'Managed by deploy/setup-vm.sh' /etc/caddy/Caddyfile; then
  echo "/etc/caddy/Caddyfile already exists and was not written by this script. Not overwriting."; exit 1
fi

sudo apt-get update
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gnupg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
sudo apt-get update
sudo apt-get install -y caddy unattended-upgrades

# Web root: releases/<timestamp> plus a "current" link, so a deploy switches in one step.
sudo mkdir -p "$WEBROOT/releases"
sudo chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$WEBROOT"

sudo tee /etc/caddy/Caddyfile >/dev/null <<EOF
# Managed by deploy/setup-vm.sh in the spectradcim-website repo.
www.${DOMAIN} {
	redir https://${DOMAIN}{uri} permanent
}

${DOMAIN} {
	root * ${WEBROOT}/current
	encode zstd gzip
	file_server

	# Hashed build files never change; pictures may be replaced under the same name.
	@hashed path /_astro/*
	header @hashed Cache-Control "public, max-age=31536000, immutable"
	@pictures path /bg/* /shots/* /brand/* /favicon.png
	header @pictures Cache-Control "public, max-age=86400"

	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "DENY"
		Referrer-Policy "strict-origin-when-cross-origin"
		Permissions-Policy "camera=(), microphone=(), geolocation=()"
		Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
		-Server
	}

	log {
		output file /var/log/caddy/spectradcim.log {
			roll_size 20mb
			roll_keep 5
		}
	}
}
EOF

sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl enable caddy
sudo systemctl reload caddy || sudo systemctl restart caddy
echo "Setup done. Web root: $WEBROOT (owned by $DEPLOY_USER). Now run deploy/deploy.sh from your PC."
