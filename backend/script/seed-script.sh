#!/bin/sh
set -e

echo "Seeding database..."
./tejoflow-backend -seed -down

echo "Starting backend..."
exec ./tejoflow-backend
