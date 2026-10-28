# Current Feature: Simplify rail column to undifferentiated list

Refine the two chosen mockups so the rail arrivals appear as a single list in one
column, with no direction sub-sections. Also narrow the mockups landing page to only
the two final directions.

## Goal

Make the two-column + banner layout cleaner by showing all rail arrivals together,
sorted by time, and present only the two chosen mockups on the landing page.

## Status

In Progress.

## Next Steps

1. Update `public/mockups/04-dashboard.html` to show all trains in one undifferentiated
   left column, sorted by arrival time.
2. Update `public/mockups/05-platform-poster.html` the same way.
3. Update `public/mockups/index.html` to list only the two chosen mockups.
4. Decide whether to delete the unused mockup files (01, 02, 03).
5. Run a quick syntax/render check.

## Acceptance Criteria

- [ ] `04-dashboard.html` shows all rail arrivals in a single left column with no
      direction groupings.
- [ ] `05-platform-poster.html` shows all rail arrivals in a single left column with no
      direction groupings.
- [ ] Both mockups keep buses in the right column and alerts in the bottom banner.
- [ ] `public/mockups/index.html` links to only the two chosen mockups.
- [ ] Files are valid HTML and render without errors.

## Out of Scope

- Wiring mockups to live data.
- Changing the production `index.html`, `app.js`, or `styles.css`.
