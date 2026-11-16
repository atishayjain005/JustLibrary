# Improvement log — 14 November 2026 IST

Repository: atishayjain005/JustLibrary. Baseline: single June 2021 commit; no issues,
pull requests, repository instructions or configured GitHub Pages site found.
Existing unrelated JobHunt and JustNotes changes were preserved.

| Problem | Proposed improvement | Reason / expected impact | Complexity | Risk | Recommendation | Deployment |
| --- | --- | --- | --- | --- | --- | --- |
| Stored HTML executes | Render book cells as text | Prevent stored markup execution | Small | Low | Implemented, review | Static release |
| Invalid books saved before validation | Trim and validate before writing | Prevent hidden invalid entries | Small | Low | Implemented, review | Static release |
| Storage errors crash app | Guard reads/writes, preserve data/input | Recoverable and honest failure state | Small | Low | Implemented, review | Static release |
| Visible row index differs from stored index | Capture original index and storage snapshot | Delete intended row; reject stale view | Small | Low | Implemented, review | Static release |
| Narrow overflow and unclear keyboard feedback | Scrollable table, labels, focus, empty state and reduced motion | Usable existing flows on small screens | Small | Low | Implemented, review | Static release |
| No public demo | Identify existing free static hosting | Shareable portfolio demonstration | Small | Hosting configuration | Backlog | Required |

Validation before each commit: syntax, all relevant browser tests, diff whitespace
check. No build/type/lint pipeline exists. Final suite: 16 cases on desktop/mobile.
No approval requests, deadlines, rejections or auto-approvals. No deployment claimed.

## 17 November 2026 IST — review completion

Repository: atishayjain005/JustLibrary. Reused the existing reliability branch and
Project #12; no existing PR or rejected proposal found.

| Problem | Proposed improvement | Reason / expected impact | Complexity | Risk | Recommendation | Deployment |
| --- | --- | --- | --- | --- | --- | --- |
| Empty saved string is overwritten as a new library | Distinguish absent storage from invalid JSON | Preserve unreadable data and user input | Small | Low | Implement | Static release |
| Hidden legacy rows look like an empty collection | Explain hidden records without modifying them | Avoid misleading empty-state and data-loss assumptions | Small | Low | Implement | Static release |
| Repeated Delete buttons lack book context | Include book title in accessible name | Identify intended deletion with assistive technology | Small | Low | Implement | Static release |
| Header animation cannot be paused | Add a persistent-in-page pause control and respect live reduced-motion changes | Give users control over recurring movement | Small | Low | Implement | Static release |
| Existing browser suite never runs on PRs | Add read-only CI with a compatible pinned OS and release checklist | Prevent regressions before review/merge | Small | Low | Implement | No app deployment for CI |

No disruptive proposals, approval deadlines or auto-approvals. Hosting remains
unconfigured (Pages API 404); no production deployment claimed.
