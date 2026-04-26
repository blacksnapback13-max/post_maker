Version 1 snapshot

Saved: 2026-04-19

Purpose:
- Preserve the current "Version 1" build as a stable fallback point.
- Allow restoring the app layout, styles, scripts, and bundled assets later.

Included:
- index.html
- styles.css
- app.js
- server.js
- README.md
- .env.example
- package.json
- assets/
- Запустить Пост мейкер.command

Not included:
- .env
- runtime logs
- PID files

Restore:
- Run `RESTORE_VERSION_1.command` from the project root.
