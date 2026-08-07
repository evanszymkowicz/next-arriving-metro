# Project Entry Point

Read `AGENTS.md` (repo root) before starting any task — it is the canonical guide for any
agent working in this repo. Then, as applicable:

- `context/current-feature.md` — the feature currently in flight.
- `context/ai-interaction.md` — how to work in this repo (communication, verification,
  git conventions).
- `context/coding-standards.md` — JavaScript/Node/Express and plain-JS frontend
  conventions.
- `context/project-overview.md` — architecture, current state, and tech stack.

## Hard rules (never violate)

- **Never commit credentials.** The WMATA API key lives only in the gitignored `.env` file
  (`WMATA_KEY=...`). Never print, log, or commit it.
- The user owns all git operations (branch, commit, merge, push) — suggest, never run.
- Never include AI attribution ("Co-Authored-By", "Generated with …") in commits or PRs.

## Post-edit check

After editing any file, run:

```
node scripts/hooks/check-changed-file.mjs <edited-file>
```

and address any findings (credential scan + JS syntax check).
