#!/bin/zsh

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_URL="http://127.0.0.1:3000"
PID_FILE="$APP_DIR/.post-maker.pid"
LOG_FILE="$APP_DIR/.post-maker-server.log"

cd "$APP_DIR"

server_is_ready() {
  curl -fsS "$APP_URL/api/config" >/dev/null 2>&1
}

cleanup_stale_pid() {
  if [[ -f "$PID_FILE" ]]; then
    local existing_pid
    existing_pid="$(cat "$PID_FILE" 2>/dev/null || true)"

    if [[ -n "$existing_pid" ]] && ! kill -0 "$existing_pid" >/dev/null 2>&1; then
      rm -f "$PID_FILE"
    fi
  fi
}

start_server() {
  if [[ ! -f ".env" ]]; then
    echo
    echo "Missing .env file."
    echo "Create it from .env.example and add GEMINI_API_KEY first."
    echo
    read -r "?Press Enter to close..."
    exit 1
  fi

  nohup node server.js >>"$LOG_FILE" 2>&1 &
  echo $! >"$PID_FILE"
}

wait_for_server() {
  local attempt
  for attempt in {1..30}; do
    if server_is_ready; then
      return 0
    fi
    sleep 1
  done

  echo
  echo "Server did not start in time."
  echo "Check the log file:"
  echo "$LOG_FILE"
  echo
  read -r "?Press Enter to close..."
  exit 1
}

cleanup_stale_pid

if ! server_is_ready; then
  start_server
  wait_for_server
fi

open "$APP_URL"
