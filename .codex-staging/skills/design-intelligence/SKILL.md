---
name: design-intelligence
description: A design elevation engine for frontend work. Use when the user provides a screenshot, mockup, design reference, Figma capture, existing component, or written UI brief and wants it recreated, refined, elevated, or converted into production-grade frontend code. Best for React, Next.js, shadcn/ui, and Tailwind-based implementation work where visual quality, interaction polish, and structured design reasoning matter.
---

# Design Intelligence

Use this skill to turn a visual reference, rough mockup, or existing UI into a stronger implementation with clear design reasoning, better polish, and a concrete build plan.

Default stack unless the user says otherwise: React, Next.js, shadcn/ui, Tailwind CSS, and `next/font/google`.

## Load References First

Read `references/learnings.md` before generating. Apply every pattern marked "What worked".

Load the other references only when needed:
- Read `references/component-patterns.md` for form, card, table, dialog, and font-loading patterns.
- Read `references/token-map.md` for shadcn token usage, spacing rhythm, type scale, and shadow patterns.

## Detect The Working Mode

Choose the mode from the input:

| Input | Mode |
|---|---|
| Screenshot or mockup plus "recreate" or "pixel perfect" | Fidelity mode |
| Screenshot or mockup plus "improve", "elevate", or "make better" | Elevation mode |
| Written design brief only | Creation mode |
| Existing frontend code plus an improvement request | Refactor mode |
| Ambiguous request | Elevation mode |

## Analyze The Input

### Visual input

Extract:
- Layout structure, spacing rhythm, and alignment system
- Typography hierarchy, font character, and weight/size contrast
- Color palette, surface hierarchy, border treatment, and accent usage
- Component inventory and visible states
- Depth signals such as shadows, blurs, glass, layering, or inset surfaces
- Motion cues such as staggered reveals, hover lift, panel transitions, or skeletons
- Responsiveness clues and any dark-mode intent

### Written brief

Infer:
- Product/domain context
- User and task intent
- Required components and states
- Quality bar implied by named references or brands

Ask one focused question only if missing context creates a real risk of building the wrong thing.

### Existing code

Audit for:
- Generic or flat visual treatment
- Hardcoded colors instead of shadcn tokens
- Missing responsive behavior
- Missing focus states, keyboard support, or ARIA
- Weak hierarchy, spacing drift, or unintentional typography
- Excessive prop drilling or brittle component structure

## Audit Against A High Bar

Judge the input against world-class product UI standards:
- Visual depth
- Typography quality
- Color confidence
- Spacing consistency
- Component polish
- Motion and feedback quality
- Dark-mode quality
- Responsiveness
- Accessibility
- Empty and loading states

Use Stripe, Linear, and Lemon Squeezy as benchmarks for precision, restraint, depth, and intentional interaction design.

## Produce A Design Contract Before Coding

Write a `DESIGN_SPEC` before implementation:

```text
DESIGN_SPEC {
  mode:
  domain:
  tone:
  layout:
  typography:
  font_loading:
  colors:
  dark_mode:
  radius:
  shadows:
  depth:
  components:
  forms:
  icons:
  motion:
  responsiveness:
  a11y:
  state_mgmt:
  elevation_targets:
  threshold:
}
```

Then write an `ELEVATION_PLAN` listing the concrete upgrades you will apply in:
- depth
- typography
- color
- motion
- polish
- UX

## Implement

Follow these rules:
- Use React component declarations in the form `const X = () => {}; export default X;`
- Prefer shadcn/ui components instead of plain HTML equivalents
- Use shadcn Field components, Zod, and React Hook Form for forms
- Use Lucide for icons unless the project clearly uses a different icon set
- Keep layouts mobile-first
- Avoid hardcoded hex values when shadcn tokens or existing CSS variables exist
- Avoid anonymous default exports, brittle inline styles, and fixed-width page shells
- If state would otherwise require prop drilling through 3 or more layers, leave a Zustand skeleton comment instead of forcing the pattern

## Motion And Depth Rules

Prefer CSS and Tailwind transitions for simple interaction polish. Use Motion only for entrance choreography, layout animation, or more complex panel/state transitions.

Apply depth intentionally:
- subtle layered shadows instead of loud decoration
- surface contrast before adding gradients
- hover lift and press feedback on interactive elements
- focus rings that are visible and deliberate

Every interactive element should have explicit hover, active, focus, disabled, and loading behavior where relevant.

## Score The Result

Run at least one self-review pass against the intended threshold.

Use this rubric:

```text
SCORE_CARD {
  layout: XX/15
  typography: XX/10
  color: XX/10
  components: XX/15
  depth: XX/10
  motion: XX/15
  responsive: XX/10
  a11y: XX/10
  code: XX/5
  total: XX/100
  threshold: XX
  pass: true|false
  gaps: []
}
```

Show the score only when the work misses the threshold or the user is explicitly debugging quality. Otherwise use it internally and return the improved result.

## Iterate If Needed

If the score misses threshold:
1. Fix only the gaps identified in the score card.
2. Re-score.
3. Stop after three passes and report the remaining gaps if still below threshold.

## Update Learnings

After a successful generation, append a short note to `references/learnings.md` using this structure:

```markdown
## [YYYY-MM-DD] - [component type]
- Input type:
- Component:
- Score achieved:
- Iterations needed:
- What worked:
- What failed first:
- Fix applied:
```
