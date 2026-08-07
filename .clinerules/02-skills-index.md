# Skills Index

Skills are pull-based in this harness: read and follow the matching `skills/<name>/SKILL.md`
file when its trigger applies. The skill file is the source of truth — don't improvise steps.

| Skill | Read it when… |
|---|---|
| `skills/load/SKILL.md` | Starting work on a new feature (points `context/current-feature.md` at the spec). |
| `skills/start/SKILL.md` | Beginning implementation of the loaded feature. |
| `skills/review/SKILL.md` | The implementation looks done — check the diff against acceptance criteria. |
| `skills/test/SKILL.md` | Verifying implemented work (syntax, lint/tests, server smoke check). |
| `skills/explain/SKILL.md` | Documenting what a feature's diff actually did. |
| `skills/complete/SKILL.md` | A feature passed review — change-log entry + reset `current-feature.md`. |

These skills are also invokable as `/project:load`, `/project:start`, `/project:review`,
`/project:test`, `/project:explain`, `/project:complete`.
