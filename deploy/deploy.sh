#!/usr/bin/env bash
# Build the site and publish it to the VM. Run from the repo root on your PC (Git Bash):
#   SITE_URL=https://example.com DEPLOY_HOST=user@203.0.113.10 bash deploy/deploy.sh
# Optional: DEPLOY_KEY=~/.ssh/id_ed25519  (SSH key file)
# Each deploy lands in releases/<timestamp>; "current" is switched only after the upload
# is complete, and the five newest releases are kept for rollback.
set -euo pipefail

: "${SITE_URL:?set SITE_URL, e.g. https://example.com}"
: "${DEPLOY_HOST:?set DEPLOY_HOST, e.g. user@203.0.113.10}"
WEBROOT=/var/www/spectradcim
SSH_OPTS=(-o StrictHostKeyChecking=accept-new)
[ -n "${DEPLOY_KEY:-}" ] && SSH_OPTS+=(-i "$DEPLOY_KEY")

STAMP=$(date -u +%Y%m%d-%H%M%S)
SITE_URL="$SITE_URL" npm run build

echo "Uploading to $DEPLOY_HOST:$WEBROOT/releases/$STAMP"
tar -czf - -C dist . | ssh "${SSH_OPTS[@]}" "$DEPLOY_HOST" "
  set -e
  mkdir -p $WEBROOT/releases/$STAMP
  tar -xzf - -C $WEBROOT/releases/$STAMP
  test -f $WEBROOT/releases/$STAMP/index.html
  ln -sfn $WEBROOT/releases/$STAMP $WEBROOT/current
  cd $WEBROOT/releases && ls -1 | sort | head -n -5 | xargs -r rm -rf
"
echo "Live: $SITE_URL  (release $STAMP)"
# Roll back: ssh in and point "current" at an older folder under $WEBROOT/releases.
