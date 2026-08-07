# Agent Task Prompts

`agents/` holds self-contained prompts for focused audit tasks. When one of these jobs comes
up, read the matching file and execute it as a dedicated, scoped pass — each defines its own
scope, categories, critical rules, and output format.

- `agents/code-scanner.md` — security/correctness/structure/light-performance audit of
  recently written or modified Node/Express and frontend code. Use after writing code or
  pre-PR.
