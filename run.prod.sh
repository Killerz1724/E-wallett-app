#!/bin/bash
set -e

# Set the nginx config for development
export NGINX_CONF=nginx.prod.conf

echo "🚀 Starting containers with $NGINX_CONF ..."
echo "⚙️  Passing extra flags to docker compose: $@"

docker compose up "$@" 