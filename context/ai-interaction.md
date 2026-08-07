# AI Interaction Guidelines

## Communication

- Be concise and direct.
- Explain non-obvious decisions briefly.
- Always ask before large refactors or architectural changes.
- Don't add features or content not requested.
- When a preference isn't documented here or in `@context/coding-standards.md`: ask, never assume.

## Code Changes

- Make minimal changes to accomplish the task.
- Don't refactor unrelated code unless asked.
- Preserve the project state described in `@context/project-overview.md`: don't pull work
  forward from a later phase without asking. The feature in flight is described in
  `@context/current-feature.md`.

## Credentials

- **The WMATA API key lives only in `.env` (`WMATA_KEY=...`).** Never print, log, or commit
  it. Never hardcode it in source files.
- `.env` is gitignored by design.

## Verify Before Handing Off

- Run `node -c` on any `.js` file you touched.
- Run `npm test` if tests exist. (Currently the test script is a placeholder.)
- For server changes, do a brief smoke check: `timeout 3 node server.js` or start the server
  and hit `/api/arrivals` once, then stop it.
- No linting tooling is scaffolded yet — update this section as tooling lands.

## Git — the user owns commits and merges

- **Do NOT commit, push, or merge** — the user handles all git operations.
- **Never** add AI attribution to commits or PRs — no "Co-Authored-By: <assistant>"
  trailers, no "Generated with <tool>" tags, nothing similar. There are no exceptions ever.
- When suggesting a commit/PR message, use a short descriptive title (conventional-commit
  style — `feat:`, `fix:`, `refactor:`, `chore:` — is welcome).
- Keep changes focused: one logical concern per PR; don't mix formatting-only churn with
  behavior changes.
- Branch naming: `feature/<desc>` or `fix/<desc>`.

## Commands the Agent May Run Without Asking

- Read-only inspection: `ls`, `cat`, `grep`, `find`, `jq`, and read-only git (`status`,
  `diff`, `log`, `show`, `ls-files`, `check-ignore`).
- Syntax check: `node -c <file>`.
- Smoke check: `timeout 3 node server.js`.

Still ask first: dependency installs (`npm install`), destructive operations (`rm`,
`git reset/restore/clean`), or anything touching credentials, `.env`, or CI secrets.

## When Stuck

- If something isn't working after 2–3 attempts, stop and explain the issue rather than
  trying random fixes.
- Ask for clarification when requirements are unclear.
