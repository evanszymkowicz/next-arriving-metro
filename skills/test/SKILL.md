---
name: test
description: Use after implementing a feature to verify it — runs syntax checks and any available tests, plus a brief server smoke check if server code changed.
---

# Test a Feature

Verifies what `start` implemented. Follow `@context/ai-interaction.md`'s "Verify Before
Handing Off" section.

## Steps

1. Read `context/current-feature.md` to see what was implemented.
2. Identify which layer(s) changed:
   - **Backend (`server.js`, `config.js`, new route modules)**: run `node -c` on each
     touched `.js` file. If `npm test` is more than a placeholder, run it. Do a brief
     smoke check with `timeout 3 node server.js` or by starting the server and hitting
     `/api/arrivals` once.
   - **Frontend (`public/`)**: verify `node -c` on touched `.js` files. Spot-check the
     change in a browser if a dev server is running.
3. If no tooling is scaffolded yet for the layer you touched, say so explicitly and fall
   back to manual checks: re-read the code and sanity-check behavior by hand.
4. Report: what was run, what passed, what failed (with file + suspected cause), and what
   couldn't be verified automatically.

## Notes

- A clean syntax check is not sufficient for behavior changes — include a smoke check when
  server code is involved.
