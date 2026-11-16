# JustLibrary

A small browser-local book collection built with HTML, Bootstrap and JavaScript.
Add a book name, author and category; revisit your collection or delete entries.
Book data stays in this browser's localStorage (`bookList`). There is no account,
server, cloud sync or backup. Clearing site data removes the collection.

## Run and verify

Use Node.js 18+ and Python 3:

```sh
npm ci
npx playwright install chromium
npm run check
npm test
npm start
```

Open http://127.0.0.1:4176. There is no build step, TypeScript checker or dedicated
linter. `check` validates JavaScript syntax. Tests exercise desktop and 320px
Chromium views: literal HTML rendering, validation, reload, deletion, malformed
storage, write failures, stale tabs and keyboard/layout behavior.

The page loads Bootstrap 5.0.1 CSS/JS from jsDelivr with integrity attributes.
Internet access is needed for Bootstrap styling. `scriptES6.js` is the active
implementation; `script.js` is retained as an unused original example.

## Storage failures

Unreadable storage is preserved, and writes are blocked until it can be read.
Inspect or back up the `bookList` value with browser developer tools before
repairing it; do not clear data unless you intend to discard the collection.
Failed writes retain form input. Invalid legacy rows are hidden but preserved.
Deletion checks whether another tab changed the collection before proceeding;
localStorage is not a transactional multi-user database.

## Deployment

Serve index.html, styles.css and scriptES6.js on a static host. No secrets,
paid services or backend are required. No public hosting is currently configured.
Existing free hosting should be selected and its actual runtime verified before
claiming a deployment. Serve from a stable origin to retain local browser data.

## Accessibility and review checks

Delete buttons include their book title in the accessible name. The header's
animation can be paused with a keyboard-accessible button and starts paused when
the system requests reduced motion. Changes to that system preference are applied
while the page is open; a manual pause lasts until reload or a preference change.

Invalid saved rows are preserved and reported below the form. An empty string
stored under `bookList` is treated as unreadable data, not as a new collection.
The empty collection prompt only appears when the saved array is actually empty.

GitHub Actions runs syntax checks and the desktop/mobile browser suite on pushes
and pull requests, using Node 22 and Ubuntu 24.04. There is no build artifact.
Before a static release:

1. Require a passing browser-test run on the exact revision being released.
2. Confirm the hosting origin and preserve existing users' `bookList` storage.
3. On the served URL, verify add, reload, keyboard deletion, pause/resume, and
   a 320px viewport. Check error recovery with disposable browser test data.
4. Record the served revision and runtime result separately from the PR status.

The current review branch is not a public deployment. Free static hosting is
tracked in [Project #12](https://github.com/users/atishayjain005/projects/12).
