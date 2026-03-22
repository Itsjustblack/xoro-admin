# Design Intelligence — Learnings Log

This file is automatically updated after each successful generation.
Read it at the start of every new task and apply patterns marked "what worked".

---

## Bootstrap entry — initial patterns

- What worked: Always declare the DESIGN_SPEC before writing code — it prevents drift between analysis and implementation
- What worked: shadcn Field + Zod + RHF for all forms — never plain HTML form elements
- What worked: Mobile-first Tailwind breakpoints on every container — sm: md: lg: xl:
- What worked: Font loaded via Next.js `next/font/google` and applied as Tailwind CSS variable — never hardcoded font-family strings
- What worked: Export pattern `const X = () => {}; export default X;` — never anonymous default exports
- What failed first: Forgetting dark mode — always check that colors work on both light and dark backgrounds
- What failed first: Fixed pixel widths on containers — always use w-full / max-w-* / min-w-*
- What failed first: Using plain `<input>` instead of shadcn `<Input>` — use shadcn components throughout
- Fix applied: Run dark mode mental check before returning — "if background were near-black, is every element still readable?"

---

<!-- New entries are appended below in this format:

## [YYYY-MM-DD] — [component type]
- Input type: image / text / both / existing-code
- Component: <what was built>
- Score achieved: XX/100
- Iterations needed: N
- What worked: <pattern that scored well>
- What failed first: <first gap caught by self-score>
- Fix applied: <what resolved it>

-->