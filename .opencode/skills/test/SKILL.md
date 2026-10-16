---
name: Test
description: Run syntax checks and verify server responds
---

## Syntax checks

```bash
node -c server.js
node -c config.js
node scripts/hooks/check-changed-file.mjs <file>
```

## Server smoke test

```bash
timeout 3 node server.js
```

Check that it starts without errors and logs `http://localhost:3000`.

## What to verify

- All `.js` files pass `node -c`
- Credential scanner passes on edited files
- Server starts and logs the listen message
