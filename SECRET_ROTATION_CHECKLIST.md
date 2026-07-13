# Secret Rotation Checklist

- Run `node scripts/secret-scan.cjs` before every commit.
- Rotate any token that was committed, pasted into logs, or displayed in screenshots.
- Check provider dashboards for current keys and revoke unused keys.
- Prefer server-side env vars; do not pass provider tokens through browsers or request bodies.
- After rotation, deploy with new values and verify old values fail.

Repo: `post_maker`
