# Token Map

shadcn/ui CSS variable reference + Tailwind usage patterns.
Always prefer these tokens over hardcoded hex values.

---

## Core shadcn tokens

### Background & Surface
| Token | Tailwind class | Usage |
|---|---|---|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Primary text |
| `--card` | `bg-card` | Card surface |
| `--card-foreground` | `text-card-foreground` | Text on card |
| `--popover` | `bg-popover` | Popover / dropdown surface |
| `--popover-foreground` | `text-popover-foreground` | Text on popover |
| `--muted` | `bg-muted` | Muted / subtle backgrounds |
| `--muted-foreground` | `text-muted-foreground` | Secondary labels, hints |

### Interactive
| Token | Tailwind class | Usage |
|---|---|---|
| `--primary` | `bg-primary` | Primary CTA color |
| `--primary-foreground` | `text-primary-foreground` | Text on primary |
| `--secondary` | `bg-secondary` | Secondary action |
| `--secondary-foreground` | `text-secondary-foreground` | Text on secondary |
| `--accent` | `bg-accent` | Hover / highlight surface |
| `--accent-foreground` | `text-accent-foreground` | Text on accent |
| `--destructive` | `bg-destructive` | Delete, error actions |
| `--destructive-foreground` | `text-destructive-foreground` | Text on destructive |

### Border, Input, Ring
| Token | Tailwind class | Usage |
|---|---|---|
| `--border` | `border-border` | Default border |
| `--input` | `border-input` | Input border |
| `--ring` | `ring-ring` | Focus ring |
| `--radius` | via `rounded-*` | Global border radius |

---

## Depth & shadow patterns

These are NOT tokens — use as raw Tailwind arbitrary values:

```tsx
// Stripe-style (barely perceptible, unmistakably present)
shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]

// Linear-style (ring + lift)
shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.08)]

// Hover elevation
hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]

// Dark mode shadow (brighter, since dark bg absorbs shadow)
dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_8px_rgba(0,0,0,0.4)]
```

---

## Spacing rhythm

Follow an 8pt grid. Common patterns:

```tsx
// Tight (form fields, dense lists)
gap-2    // 8px
gap-3    // 12px

// Default (cards, sections)
gap-4    // 16px
gap-6    // 24px

// Loose (page sections, hero areas)
gap-8    // 32px
gap-12   // 48px
gap-16   // 64px

// Responsive padding
px-4 sm:px-6 lg:px-8
py-8 sm:py-12 lg:py-16
```

---

## Typography scale

```tsx
// Display / hero
text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none

// Page title
text-2xl sm:text-3xl font-semibold tracking-tight

// Section heading
text-xl font-semibold

// Card title
text-base font-medium

// Body
text-sm text-foreground leading-relaxed

// Caption / muted
text-xs text-muted-foreground

// Mono (data, code, prices)
font-mono text-sm tabular-nums
```

---

## Border radius patterns

shadcn uses `--radius` as the base. Tailwind maps:

```tsx
rounded-sm   // calc(var(--radius) - 4px)  — subtle
rounded-md   // calc(var(--radius) - 2px)  — inputs, buttons
rounded-lg   // var(--radius)              — cards (default)
rounded-xl   // calc(var(--radius) + 4px)  — modals, panels
rounded-full // 9999px                     — pills, avatars
```

---

## Dark mode patterns

```tsx
// Surface hierarchy (light → dark)
bg-white dark:bg-zinc-950           // page
bg-zinc-50 dark:bg-zinc-900         // card
bg-zinc-100 dark:bg-zinc-800        // inset / muted
bg-zinc-200 dark:bg-zinc-700        // separator

// Text hierarchy
text-zinc-900 dark:text-zinc-50     // primary
text-zinc-600 dark:text-zinc-400    // secondary
text-zinc-400 dark:text-zinc-600    // placeholder / hint

// Border
border-zinc-200 dark:border-zinc-800

// Always prefer shadcn tokens above — these are fallbacks for custom surfaces
```