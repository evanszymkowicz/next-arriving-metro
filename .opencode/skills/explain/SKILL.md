---
name: Explain
description: Summarize what changed and why
---

## Process

1. Run `git diff` to see all changes
2. Group changes by file
3. For each file, explain:
   - What changed (added/removed/modified)
   - Why it changed (the intent, not just the mechanics)

## Output format

```
## Summary
[One paragraph: what this change does]

## File-by-file
- **file.js**: [what changed] → [why]
- **other.js**: [what changed] → [why]
```

Keep it concise. No need to explain obvious changes.
