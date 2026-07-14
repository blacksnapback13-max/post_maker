# Audit

| Severity | Repo | File/line | Problem | Consequence | Fix | Status |
|---|---|---|---|---|---|---|
| P0 | post_maker | repository-wide | No repeatable secret scan/checklist was present. | Tokens can be committed or rotated too late. | Added `scripts/secret-scan.cjs`, `--history` scanning, CI workflow, and rotation checklist. | Fixed |
| P0 | post_maker | server.js API routes | AI generation endpoints lacked production app-level auth. | Public callers could spend provider quota. | Added production bearer guard and origin-aware CORS. The requested HttpOnly login/session flow for desktop/mobile is not implemented yet. | Partially fixed |
| P0 | post_maker | server.js startup | `isProduction()` was referenced but not defined. | Server import and smoke tests crashed before production compatibility could be verified. | Added the missing `isProduction()` helper. | Fixed |
| P1 | post_maker | server.js AI endpoints | Dedicated AI endpoint rate limiting is not implemented. | Credentialed abuse can still consume provider quota. | Documented as required next change. | Open |
| P1 | post_maker | CI | Existing workflow only ran secret scan. | PR could merge without smoke/history validation. | CI now runs install, syntax check, release smoke, UI smoke, current secret scan, and history secret scan. | Fixed |
