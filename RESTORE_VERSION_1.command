#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SNAPSHOT_DIR="$SCRIPT_DIR/snapshots/version-1"

if [ ! -d "$SNAPSHOT_DIR" ]; then
  echo "Snapshot 'version-1' was not found."
  exit 1
fi

cp "$SNAPSHOT_DIR/index.html" "$SCRIPT_DIR/index.html"
cp "$SNAPSHOT_DIR/styles.css" "$SCRIPT_DIR/styles.css"
cp "$SNAPSHOT_DIR/app.js" "$SCRIPT_DIR/app.js"
cp "$SNAPSHOT_DIR/server.js" "$SCRIPT_DIR/server.js"
cp "$SNAPSHOT_DIR/README.md" "$SCRIPT_DIR/README.md"
cp "$SNAPSHOT_DIR/.env.example" "$SCRIPT_DIR/.env.example"
cp "$SNAPSHOT_DIR/package.json" "$SCRIPT_DIR/package.json"
cp "$SNAPSHOT_DIR/Запустить Пост мейкер.command" "$SCRIPT_DIR/Запустить Пост мейкер.command"

rm -rf "$SCRIPT_DIR/assets"
cp -R "$SNAPSHOT_DIR/assets" "$SCRIPT_DIR/assets"

echo "Version 1 has been restored."
