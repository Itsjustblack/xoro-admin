## Plan: Balance Filter Popover (Partial Height)

Implement a trigger-anchored popover for the Balance table Filter button that matches the provided reference: rounded card panel, active filter chips, sectioned controls, and sticky footer actions.

Constraints:
- Keep existing transaction labels: Completed, Pending, Failed.
- Keep partial-height behavior (never full-screen).
- Apply filters only when the user clicks Apply Filters.

**Steps**
1. Phase 1: Filter state and data contract
2. Define a dedicated filter state model near the balance table feature (status, transaction type/payment method, date preset/custom range, amount range, currency, active chips).
3. Expand transaction data support to include missing fields required by the UI (payment method and currency) so all controls can filter real data; keep backward compatibility by mapping existing rows where needed.
4. Add parsing helpers for amount/date values and predicate helpers for each filter dimension; ensure combined filtering uses AND semantics.
5. Phase 2: Popover container (partial-height)
6. Add or reuse a popover primitive in the design system (create one if not present), then build a trigger-anchored filter popover content card with capped height and internal scroll.
7. Style popover content to match the image: compact title row with Reset All, chips row, section labels, rounded segmented options, dashed custom date button, and footer actions.
8. Keep desktop behavior anchored to the Filter button and add a responsive fallback for small screens that still avoids full-height takeover.
9. Phase 3: Wire controls to table behavior
10. Connect popover open/close state to the Filter button in the balance transactions header.
11. Implement staged edits in popover local state; on Apply Filters, commit to table filter state, recalculate filtered rows, reset pagination index to first page, and close popover.
12. Implement Clear All and Reset All semantics: Clear All resets working state; Reset All clears currently applied filters and chips.
13. Render active filter chips in the popover header area and support per-chip removal.
14. Phase 4: QA and polish
15. Verify keyboard/focus behavior (escape close, focus trap/return, tab order), scroll containment, and non-overflow on common desktop/mobile breakpoints.
16. Validate filtered result counts and empty state behavior in the table footer and DataTable empty state.
17. Run lint/type checks and manually test all filter combinations against mock data.

**Relevant files**
- components/balance/balance-transactions-table.tsx
- components/balance/balance-filter-panel.tsx
- components/ui/popover.tsx
- lib/types.ts
- lib/mock-data.ts
- hooks/use-mobile.ts

**Verification**
1. Run pnpm lint and ensure no TypeScript errors for updated types and props.
2. Manual UI check on Balance page: click Filter, confirm a trigger-anchored partial-height popover appears (not full-screen).
3. Validate each section works: status, payment method/type, date presets/custom range, amount range, currency.
4. Confirm Apply Filters updates rows and count text, and resets pagination to page 1.
5. Confirm Reset All and Clear All produce expected behavior and chip list updates immediately.
6. Check responsive behavior at desktop and <=768px widths for bounded-height popover usability.

**Decisions**
- Use a popover anchored to the Filter button.
- Keep partial-height panel behavior (no full-height takeover).
- Keep status labels as Completed/Pending/Failed to match current data model.
- Apply-on-submit behavior (Apply Filters button), not instant filtering.
- Include full filter sections from the reference image in first implementation.

**Further considerations**
1. If popover viewport collision causes clipping near page edges, switch to side/align offsets while keeping the same visual card.
2. If future API integration arrives, preserve the filter-state shape so it maps directly to query params.