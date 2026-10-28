# Project Entry Point

## Hard rules (never violate)

- The WMATA API key lives only in the gitignored `.env`. Never print, log, commit it, or
  return it to the client.
- This app does not persist data — live WMATA responses are cached in memory only.
- The user owns all git operations (branch, commit, merge, push) — suggest, never run.
- Never include AI attribution ("Co-Authored-By", "Generated with …") in commits or PRs.
- Never write `context/current-feature.md` or `context/change-log/` unless the user
  explicitly ran `/load`, `/start`, or `/complete`. Those skills are the only writers.
