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
