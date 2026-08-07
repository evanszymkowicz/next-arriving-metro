# AGENTS.md

Guidance for AI agents working in this repository. Harness- and model-agnostic — any agent
(Cline, Claude Code, Cursor, Codex, …) should follow this file plus `context/`.

## Project

`next-arriving-metro`: a small Node/Express app that shows the next arriving WMATA rail and
bus predictions for a configured station/stop. The backend proxies the WMATA API and the
frontend polls `/api/arrivals`.

## Status

The repo is early-stage. The Express server and a basic static frontend exist, but several
backend routines are still stubs or unimplemented (see `context/project-overview.md`). Read
these before starting work:

- `context/project-overview.md` — architecture, current state, and tech stack.
- `context/current-feature.md` — the feature in flight.
- `context/ai-interaction.md` — how to work in this repo: verification expectations,
  git/PR conventions.
- `context/coding-standards.md` — JavaScript/Node/Express and plain-JS frontend conventions.

## Commands

From the repo root:

```
npm start          # node server.js
npm run dev        # nodemon index.js
npm test           # currently a placeholder — see project-overview.md
```

For a quick syntax check on a single file:

```
node -c <file>
```

## Data / credential rules

- **The WMATA API key lives only in `.env`.** It is never logged, printed, or committed.
- This app does not persist data. It reads live WMATA API responses and caches them in
  memory only.

## Agent tooling

This repo ships harness-neutral skills, agent prompts, and hook cores. Harness-specific
wiring (currently `.clinerules/`) is a thin shim over these files — treat them as canonical.

- **Agent prompts** (`agents/`): `code-scanner` (security/correctness audit of Node/Express
  and frontend code). Each is a self-contained task prompt — read the file and execute it as
  a focused subtask when its trigger applies.
- **Skills** (`skills/<name>/SKILL.md`, pull-based — read when the trigger applies): the
  feature workflow — `load` (point `current-feature.md` at a new feature spec), `start`
  (begin implementation), `review` (check against goals/acceptance criteria), `test`
  (syntax/tests/server smoke check), `explain` (document the diff), `complete` (change-log
  entry + reset).
- **Hooks** (`scripts/hooks/` + `.githooks/pre-commit`):
  `scripts/hooks/check-changed-file.mjs <path>` scans a just-edited file for leaked
  `WMATA_KEY` credentials and runs `node -c` on `.js` files. The pre-commit hook runs it
  against staged files. Enable once per clone: `git config core.hooksPath .githooks`.

## Tech Stack

- **Backend**: Node.js, Express, `node-fetch` v2, `dotenv`.
- **Frontend**: static HTML/CSS/JS served from `public/`.
- **External API**: WMATA (Washington Metropolitan Area Transit Authority) developer API.
- **No database or build step** at this stage.
