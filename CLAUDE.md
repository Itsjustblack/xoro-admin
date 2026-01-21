# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application

- `pnpm dev` - Start the Next.js development server on http://localhost:3000
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Package Management

This project uses pnpm as the package manager (see `pnpm-workspace.yaml` and `pnpm-lock.yaml`).

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with shadcn/ui components (radix-nova style)
- **UI Components**: shadcn/ui based on Radix UI primitives
- **Data Visualization**: Recharts for charts
- **Tables**: TanStack Table v8 with drag-and-drop sorting via @dnd-kit
- **Validation**: Zod v4

### API Implementation

When implementing APIs, follow the conventions in [API-GUIDELINES.md](./API-GUIDELINES.md). Key patterns include:

- API files live under `lib/api/v1/`, organized by resource
- `queries.ts` for GET operations, `actions.ts` for mutations
- Query keys defined in `lib/api/v1/query-key-factory.ts`
- Types centralized in `lib/api/v1/types.ts`
- Use the pre-configured axios client from `@/lib/api/v1/axios`

## File Placement Guidelines

### `lib/` - Shared Utilities and Data

| File               | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `lib/types.ts`     | All TypeScript interfaces and type definitions      |
| `lib/mock-data.ts` | Mock/seed data for development                      |
| `lib/constants.ts` | App-wide constants (PAGE_SIZE, PAGE_SIZE_OPTIONS)   |
| `lib/utils.ts`     | Utility functions (`cn()` helper for class merging) |

### `components/` - React Components

| Directory                   | Purpose                                                               |
| --------------------------- | --------------------------------------------------------------------- |
| `components/ui/`            | shadcn/ui primitives (button, card, table, tabs, dialog, etc.)        |
| `components/chat/`          | Chat/inbox components (chat-list, conversation-panel, message-bubble) |
| `components/customer/`      | Customer management (customer-table, customer-modal)                  |
| `components/product/`       | Product management (product-card, product-list, product-modal)        |
| `components/order/`         | Order management (order-table, order-modal)                           |
| `components/dashboard/`     | Dashboard components (metric-card, interactive-chart, pie-chart)      |
| `components/notifications/` | Notification components (notification-pane)                           |
| `components/*.tsx`          | Shared layout components (app-sidebar, site-header, data-table)       |

### `app/` - Next.js Routes

| Route        | File                     | Purpose                                               |
| ------------ | ------------------------ | ----------------------------------------------------- |
| `/`          | `app/page.tsx`           | Dashboard home page                                   |
| `/chat`      | `app/chat/page.tsx`      | Inbox/chat interface                                  |
| `/customers` | `app/customers/page.tsx` | Customer management                                   |
| `/products`  | `app/products/page.tsx`  | Product management                                    |
| `/orders`    | `app/orders/page.tsx`    | Order management                                      |
| `/settings`  | `app/settings/page.tsx`  | Settings (Channels, Agent Config, Notifications tabs) |

### `hooks/` - Custom React Hooks

- `hooks/use-[name].ts` - Custom hooks (e.g., `use-mobile.ts` for mobile detection)

## Color Theory & Theming (Light Mode Only)

> **Note**: Dark mode is not implemented. Light mode only for now.

### OKLCH Color System

Colors use the OKLCH format: `oklch(Lightness Chroma Hue)`

- **Lightness**: 0 (black) to 1 (white)
- **Chroma**: 0 (gray) to ~0.4 (vivid)
- **Hue**: 0-360° color wheel position

### XORO Brand Colors

```css
--indigo-ink: oklch(0.22 0.15 285); /* Deep indigo for text */
--ultra-violet: oklch(0.58 0.2 280); /* Vibrant accent */
--onyx: oklch(0 0 0); /* Pure black */
--light-grey: oklch(0.97 0 0); /* Subtle backgrounds */
--muted-green: oklch(0.68 0.08 140); /* Success states */
```

### Primary Palette (Indigo Spectrum, Hue 280-286°)

| Variable               | OKLCH Value            | Usage                           |
| ---------------------- | ---------------------- | ------------------------------- |
| `--primary`            | `oklch(0.40 0.20 285)` | Buttons, links, primary accents |
| `--primary-foreground` | `oklch(0.99 0.01 285)` | Text on primary backgrounds     |
| `--background`         | `oklch(1 0 0)`         | Page background (white)         |
| `--foreground`         | `oklch(0.145 0 0)`     | Primary text color (near black) |
| `--muted`              | `oklch(0.97 0 0)`      | Subtle backgrounds              |
| `--muted-foreground`   | `oklch(0.556 0 0)`     | Secondary text                  |
| `--border`             | `oklch(0.922 0 0)`     | Border color (light gray)       |
| `--destructive`        | `oklch(0.58 0.22 27)`  | Error/delete actions (red)      |

### Chart Colors (Indigo Gradient)

| Variable    | OKLCH Value            |
| ----------- | ---------------------- |
| `--chart-1` | `oklch(0.5 0.08 273)`  |
| `--chart-2` | `oklch(0.35 0.13 281)` |
| `--chart-3` | `oklch(0.27 0.15 284)` |
| `--chart-4` | `oklch(0.22 0.15 285)` |
| `--chart-5` | `oklch(0.18 0.13 286)` |

## Minimalistic Design Principles

**Always prioritize clean, functional design:**

1. **Whitespace is essential** - Generous padding and margins create visual breathing room
2. **Avoid clutter** - Only include elements that serve a purpose
3. **Subtle borders** - Use light gray borders (`--border`) sparingly
4. **Minimal shadows** - Avoid heavy drop shadows; prefer subtle elevation
5. **Limited color palette** - Stick to the indigo primary palette; use color purposefully
6. **Typography hierarchy** - Use font weight and size to establish hierarchy, not decorative elements
7. **Functional over ornamental** - Every UI element should have a clear purpose
8. **Clean tables** - Simple borders, adequate row spacing, clear headers
9. **Restrained animations** - Subtle transitions only; no flashy effects

## Component System

This project uses shadcn/ui with the "radix-nova" style preset. Components are installed via the shadcn CLI:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Configuration in `components.json`:

- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`
- Icon library: lucide-react
- CSS variables enabled for theming

### Import Aliases

All imports use the `@/` alias which maps to the project root:

```typescript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CustomerData } from "@/lib/types";
import { mockCustomers } from "@/lib/mock-data";
import { PAGE_SIZE } from "@/lib/constants";
```

## Component Design Principles

**Simplicity & Modularity:**

- Single responsibility - each component does one thing well
- Small, focused components over large monolithic ones
- Compose complex UIs from simple building blocks
- Props should be minimal and well-typed
- Avoid prop drilling - use composition patterns

## Code Quality Standards

### Naming Conventions

- Components: PascalCase (`CustomerTable`, `MetricCard`)
- Files: kebab-case (`customer-table.tsx`, `metric-card.tsx`)
- Functions/variables: camelCase (`handleSubmit`, `isLoading`)
- Constants: SCREAMING_SNAKE_CASE (`PAGE_SIZE`, `API_URL`)
- Types/Interfaces: PascalCase (`CustomerData`, `OrderItem`)

### Code Structure

- Imports grouped: React → external libs → internal modules → types → styles
- Early returns for guard clauses
- Destructure props at function signature
- Keep functions short and focused
- Use TypeScript strictly - no `any` types

### Best Practices

- Prefer `const` over `let`
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Extract reusable logic into custom hooks
- Co-locate related code (component + types + styles)
- Use meaningful variable names - no abbreviations

## TypeScript Configuration

- Target: ES2017
- Path alias: `@/*` maps to root directory
- Strict mode enabled
- JSX: react-jsx (automatic runtime)

### Type Definitions (`lib/types.ts`)

All interfaces are centralized:

- `ChatItem`, `Message` - Chat/inbox types
- `CustomerData` - Customer management
- `Product` - Product catalog
- `Order`, `OrderItem` - Order management
- `Notification` - Notification system

## Font Configuration

The project uses multiple fonts configured in the root layout:

- DM Sans (CSS variable: `--font-sans`) - Primary UI font
- Geist Sans (CSS variable: `--font-geist-sans`)
- Geist Mono (CSS variable: `--font-geist-mono`) - Code/monospace
