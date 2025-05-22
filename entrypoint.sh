#!/bin/sh

echo "Running migrations..."
npx prisma migrate deploy || echo "⚠️ Migrations failed but continuing..."

echo "Starting app..."
exec node dist/src/main.js
