---
name: review
description: Use once a feature's implementation looks done — checks the diff against context/current-feature.md's Goal/Acceptance Criteria/Out of Scope and gives a ready-to-complete verdict.
---

# Review a Feature

Checks implemented code against what `context/current-feature.md` actually asked for —
distinct from `test` (syntax/tests/server checks) and from the `code-scanner` agent
(security/correctness audit).

## Steps

1. Read `context/current-feature.md` — `## Goal`, `## Acceptance Criteria`, and
   `## Out of Scope`.
2. Review the actual changes (`git diff` against the branch's base) made for this feature.
3. Check for, and call out explicitly:
   - ✅ Acceptance criteria met
   - ❌ Criteria missing or incomplete
   - ⚠️ Code quality issues, bugs, or violations of `@context/coding-standards.md`
   - 🚫 Scope creep — work outside `## Goal`/`## Acceptance Criteria` or inside
     `## Out of Scope`
4. If the diff touches API-key handling, `.env` parsing, or credential-adjacent code, say
   so and suggest running the `code-scanner` agent before completing.
5. Give a verdict: **Ready to complete** or **Needs changes**, with a short list of what's
   blocking if the latter.

## Notes

- This is a judgment check against the spec, not a re-run of syntax/tests — that's `test`.
- Don't skip straight to "looks fine" without reading the Acceptance Criteria first.
