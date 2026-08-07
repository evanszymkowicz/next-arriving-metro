# Coding Standards

This repo is a single Node/Express backend plus a small static frontend. These are the
conventions to build to. Add real commands to `AGENTS.md` and `@context/ai-interaction.md`
as tooling lands.

## JavaScript (Node + browser)

- Use `const` by default, `let` when rebinding, never `var`.
- Prefer `async`/`await` over raw Promise chains.
- Use strict equality (`===` / `!==`).
- No implicit globals; modules are explicit.
- Handle errors explicitly — don't swallow exceptions silently. Log meaningful messages and,
  where appropriate, return a sensible HTTP error response.

## Node / Express

- Keep route handlers small; delegate to named functions or modules as the app grows.
- Middleware ordering matters: error handlers last.
- Configuration (WMATA API key, port, station codes) comes from environment variables via
  `dotenv`, not hardcoded source edits.
- Use `node-fetch` v2 consistently until a migration is deliberate.

## Frontend (plain JS)

- Guard DOM lookups; render explicit empty/error states instead of blank sections.
- Keep DOM manipulation and fetch logic separate where possible.
- Avoid inline styles; use `public/styles.css`.

## File Organization & Naming

- Functions: camelCase. Constants: SCREAMING_SNAKE_CASE. Classes/types: PascalCase.
- Files: kebab-case or match the exported name.
- Static assets live in `public/`.

## Formatting

- No project formatter is configured yet. Match the existing indentation style in the file
  you edit. Do not reformat whole files as a side effect of an unrelated change.
- The project's Prettier/formatter config will be authoritative if one is added later.

## Testing

- Run `npm test` before declaring any feature finished once real tests exist.
- Until then, `node -c` plus a brief server smoke check is the baseline.

## Code Quality

- No commented-out code, unused imports, or unused variables.
- No copy-pasted constants or helpers across files — extract shared values.

## Comments

- Default to no comments. Well-named identifiers should carry the meaning.
- When a comment is warranted, keep it to **one or two lines** — a non-obvious constraint,
  invariant, or workaround, not an explanation of what the code does.
- Never document overall file purpose or module structure in comments — that belongs in
  `context/`.
