# Audit

| Severity | Repo | File/line | Problem | Consequence | Fix | Status |
|---|---|---|---|---|---|---|
| P0 | post_maker | repository-wide | No repeatable secret scan/checklist was present. | Tokens can be committed or rotated too late. | Added `scripts/secret-scan.cjs`, GitHub Actions security workflow, and rotation checklist. | Fixed |
| P0 | post_maker | server.js API routes | AI generation endpoints lacked production app-level auth. | Public callers could spend provider quota. | Added production bearer guard and origin-aware CORS. | Fixed |
