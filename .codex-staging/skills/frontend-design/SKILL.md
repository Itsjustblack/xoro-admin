---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with strong visual direction and implementation quality. Use when the user asks to build or restyle web pages, React components, dashboards, forms, landing pages, HTML/CSS layouts, or any frontend UI that should look intentional, polished, and non-generic. Prefer this skill for frontend build requests that need design judgment as much as code.
---

# Frontend Design

Use this skill when the user wants a frontend built, redesigned, beautified, or elevated beyond generic patterns.

Default assumptions unless the user says otherwise:
- Use React
- Use shadcn/ui components where they fit the project
- Deliver working code, not mock markup

## Start With A Short Design Declaration

Before writing code, state:
1. Purpose of the interface
2. Intended audience or product domain
3. Chosen aesthetic direction
4. Font direction
5. Complexity level: simple, medium, or complex

Ask one focused question only if a missing detail would materially change the outcome.

## Implementation Rules

### React

- Use `const MyComponent = () => {}; export default MyComponent;`
- Avoid anonymous default exports
- Avoid deep prop drilling; if state would pass through 3 or more layers, leave a Zustand skeleton comment
- Do not over-engineer simple components

### Components

- Prefer shadcn/ui components instead of raw HTML controls
- For forms, use shadcn Field patterns with Zod and React Hook Form
- Match the project's existing component system if one already exists

### Fonts

Choose fonts intentionally for the domain. Do not default to Inter, Roboto, Arial, or generic system stacks when the task allows a stronger direction.

Load fonts through `next/font/google` and apply them through CSS variables or the project's existing font system.

### Responsiveness

- Build mobile-first
- Use fluid widths and max-width containers instead of fixed page widths
- Scale spacing and typography with breakpoints
- Sanity-check the result at phone, tablet, and desktop sizes

## Choose A Strong Visual Direction

Pick one direction and commit to it:
- brutally minimal
- maximalist editorial
- retro-futuristic
- organic and natural
- luxury refined
- playful
- brutalist/raw
- art deco/geometric
- soft pastel
- industrial utilitarian
- dark technical
- warm human
- corporate elevated
- cyberpunk dense

Choose based on the product context, not novelty.

## Design Quality Rules

- Avoid flat, single-color backgrounds by default
- Use depth, texture, gradients, shape, or layering when it improves the composition
- Avoid generic purple-on-white SaaS styling
- Let typography do real hierarchy work
- Prefer one coherent accent strategy over many competing colors
- Use asymmetry or controlled density when it helps the design feel intentional

## Motion Rules

- Prefer CSS/Tailwind transitions first
- Use Motion only for choreography, layout animation, or stateful transitions that need it
- Keep animation purposeful
- Match motion energy to the product domain

At minimum, give buttons, links, cards, and form fields clear hover, active, and focus behavior.

## Accessibility Baseline

- Keep semantics correct
- Preserve visible focus states
- Ensure keyboard access for interactive controls
- Maintain usable color contrast
- Use labels, `aria-invalid`, and `aria-describedby` where forms need them

## Final Checklist

- Make sure the chosen aesthetic is visible in the output
- Make sure the code is real and runnable
- Make sure the UI is responsive
- Make sure the interaction states are not placeholders
- Make sure the result does not look like interchangeable AI-generated UI
- Make sure the implementation still respects the surrounding codebase when working inside an existing app

Build with taste, but keep every choice defensible.
