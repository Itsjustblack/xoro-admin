# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
- `npm run dev` or `pnpm dev` - Start the Next.js development server on http://localhost:3000
- `npm run build` or `pnpm build` - Create production build
- `npm start` or `pnpm start` - Start production server
- `npm run lint` or `pnpm lint` - Run ESLint

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

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration (DM Sans, Geist)
  - `page.tsx` - Home page rendering dashboard
  - `globals.css` - Global styles and Tailwind configuration
  - `customers/` - Customers management page
  - `products/` - Products management page
  - `chat/` - Chat/Inbox page
- `components/` - React components
  - `ui/` - shadcn/ui primitives (button, card, table, sidebar, dialog, etc.)
  - `customer/` - Customer-related components (customers-table, customer-modal)
  - `product/` - Product-related components (product-card, product-list)
  - `chat/` - Chat components
  - `dashboard/` - Dashboard components
  - `app-sidebar.tsx` - Main sidebar navigation
  - `data-table.tsx` - Reusable data table component
- `lib/` - Utility functions and data
  - `utils.ts` - Contains `cn()` helper for class merging (clsx + tailwind-merge)
  - `types.ts` - TypeScript type definitions (CustomerData, Product, ChatItem, Message)
  - `mock-data.ts` - Mock data for development (customers, products, chats)
  - `constants.ts` - App constants (PAGE_SIZE, etc.)
- `hooks/` - Custom React hooks
  - `use-mobile.ts` - Mobile detection hook
- `public/` - Static assets

### Component System
This project uses shadcn/ui with the "radix-nova" style preset. Components are installed via the shadcn CLI and customized as needed. The configuration is in `components.json`:
- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`
- Icon library: lucide-react
- CSS variables enabled for theming

### Styling Approach
- Tailwind CSS v4 with PostCSS plugin (`@tailwindcss/postcss`)
- Custom theme variables defined in `globals.css` including XORO brand colors
- Dark mode via custom variant: `@custom-variant dark (&:is(.dark *))`
- Utility function `cn()` for conditional class merging

### TypeScript Configuration
- Target: ES2017
- Path alias: `@/*` maps to root directory
- Strict mode enabled
- JSX: react-jsx (automatic runtime)

### Key Features
- **Dashboard**: Main UI showcasing data tables with drag-and-drop row reordering
- **Sidebar Navigation**: Collapsible sidebar with nav sections (Dashboard, Lifecycle, Analytics, Projects, Team)
- **Advanced Tables**: TanStack Table integration with sorting, filtering, pagination, and @dnd-kit drag-and-drop
- **Charts**: Recharts area charts for data visualization

## Important Notes

### Adding shadcn/ui Components
Use the shadcn CLI to add new components:
```bash
npx shadcn@latest add [component-name]
```

### Import Aliases
All imports use the `@/` alias which maps to the project root:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Font Configuration
The project uses multiple fonts configured in the root layout:
- DM Sans (CSS variable: `--font-sans`)
- Geist Sans (CSS variable: `--font-geist-sans`)
- Geist Mono (CSS variable: `--font-geist-mono`)
