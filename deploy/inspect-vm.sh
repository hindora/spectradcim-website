#!/usr/bin/env bash
# Read-only look at a VM before adding the site to it. Changes nothing.
# Run ON THE VM:  bash inspect-vm.sh   and send back the output.
echo "== OS";            . /etc/os-release 2>/dev/null; echo "$PRETTY_NAME"
echo "== Listening web ports (80, 443, 8080, 8443)"
sudo ss -ltnp 2>/dev/null | grep -E ':(80|443|8080|8443)\s' || echo "none"
echo "== Web servers / proxies installed"
for b in nginx apache2 httpd caddy traefik haproxy; do command -v $b >/dev/null 2>&1 && echo "$b: $(command -v $b)"; done
systemctl list-units --type=service --state=running 2>/dev/null | grep -Ei 'nginx|apache|httpd|caddy|traefik|haproxy' || true
echo "== Docker containers publishing ports"
command -v docker >/dev/null 2>&1 && sudo docker ps --format '{{.Names}}  {{.Image}}  {{.Ports}}' || echo "docker not installed"
echo "== Existing site configs"
ls /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/apache2/sites-enabled /etc/caddy 2>/dev/null
echo "== Certificates already managed"
sudo ls /etc/letsencrypt/live 2>/dev/null || echo "no certbot certificates"
echo "== Disk and memory"; df -h / | tail -1; free -m | sed -n 2p
