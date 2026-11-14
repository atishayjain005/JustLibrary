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
