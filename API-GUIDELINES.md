# API Implementation Guidelines

This document outlines the conventions and patterns used for API implementation in this project. These are guidelines based on how the codebase is structured—not strict rules, but recommended practices to maintain consistency.

---

## Directory Structure

API-related files live under `lib/api/v1/`, organized by resource (merchant, user, wallet, etc.). Each resource folder typically contains:

- **queries.ts** — Read operations (GET requests)
- **actions.ts** — Write operations (POST, PUT, DELETE requests)

Shared types are centralized in `lib/api/v1/types.ts`, and query keys for React Query are defined in `lib/api/v1/query-key-factory.ts`.

This separation keeps read and write logic distinct, making it easier to locate and maintain API functions.

---

## Naming Conventions

**Files** use kebab-case (lowercase with dashes):
- `query-key-factory.ts`
- `use-merchant-data.ts`
- `payment-channels.ts`

**Hooks** follow the `use-[description].ts` pattern where the name describes what the hook does:
- `use-merchant-data.ts` — fetches merchant data
- `use-create-beneficiary.ts` — creates a beneficiary
- `use-transaction-filters.ts` — manages transaction filter state

**Functions** use camelCase and should clearly indicate their action:
- Queries: `get[Resource]` or `getAll[Resources]` (e.g., `getMerchant`, `getAllTransactions`)
- Mutations: `create[Resource]`, `update[Resource]`, `delete[Resource]`
- Other actions: `[verb][Resource]` (e.g., `approvePayout`, `generatePaymentLink`)

---

## Query Key Factory

Query keys follow a hierarchical pattern defined in `lib/api/v1/query-key-factory.ts`. This approach enables granular cache invalidation—invalidating a parent key automatically clears all nested caches.

Each resource typically has:
- A base key (e.g., `["merchants"]`)
- An item key that includes an ID
- Sub-resource keys that nest under the item (e.g., transactions, beneficiaries)

Keys use `as const` for type safety. When adding a new resource, consider how it relates to existing entities and structure keys accordingly.

---

## Axios Client

The axios client in `lib/api/v1/axios.ts` is pre-configured with the base URL from environment variables. A request interceptor automatically attaches the Bearer token from cookies to each request, so individual API functions don't need to handle authentication.

When making API calls, import the default `apiClient` from `@/lib/api/v1/axios` and use it directly. The token injection happens transparently.

---

## Environment Variables

All sensitive configuration (API base URLs, keys, secrets) must be stored in `.env` files—never hardcoded in source files.

**Required variables:**
- `NEXT_PUBLIC_API_BASE_URL` — Base URL for API requests (used by axios client)

**Rules:**
- Add all environment variables to `.env.local` for local development
- Use `.env.example` to document required variables (without actual values)
- Never commit `.env` or `.env.local` to version control
- Access variables via `process.env.VARIABLE_NAME`
- Prefix with `NEXT_PUBLIC_` only if the variable needs to be exposed to the browser

---

## Query Files

Query files contain functions for fetching data. The naming convention typically follows `get[Resource]` or `getAll[Resources]` (e.g., `getMerchantData`, `getAllTransactions`).

Each function:
- Uses a GET request via `apiClient`
- Accepts parameters for filtering, pagination, or identification
- Returns typed response data
- Wraps the call in try-catch, re-throwing errors as `AxiosError`

For paginated endpoints, functions usually accept separate objects for page parameters and query filters.

---

## Action Files

Action files handle mutations—creating, updating, or deleting resources. Naming conventions vary by operation:

- **Create**: `create[Resource]`
- **Update**: `update[Resource]`
- **Delete**: `delete[Resource]`
- **Other actions**: `[verb][Resource]` (e.g., `merchantPayout`, `generatePaymentLink`)

The structure mirrors query files: import the client, define a typed async function, make the appropriate HTTP call (POST/PUT/DELETE), and handle errors consistently.

**Example pattern:**

```typescript
export async function createBeneficiary(payload: BeneficiaryPayload) {
  try {
    const res = await apiClient.post<Beneficiary>("/payout-beneficiary", payload);
    return res.data;
  } catch (error) {
    throw error as AxiosError;
  }
}
```

---

## Type Definitions

Types are centralized in `lib/api/v1/types.ts`. This includes:

- **Enums and union types** — Transaction types, statuses, payment channels
- **Entity interfaces** — The shape of data returned from the API (IMerchant, Beneficiary, ITransaction)
- **Payload types** — Types for mutation inputs, often derived from entities with auto-generated fields omitted
- **Response types** — Paginated response structures with metadata (total items, pages, etc.)
- **QueryParams** — A standard type for pagination parameters used across the codebase

When adding new API endpoints, define types here to keep them discoverable and reusable.

---

## React Query Usage

React Query is configured in `providers/react-query-client-provider.tsx` with sensible defaults:
- Data stays fresh for 10 minutes before becoming stale
- Garbage collection occurs after 30 minutes
- Failed requests retry twice
- A global mutation error handler shows toast notifications (can be skipped per-mutation via meta)

**Fetching data**: Use `useQuery` with a query key from the factory and a query function that calls your API function.

**Mutating data**: Use `useMutation` with the action function. On success, invalidate related query keys to trigger refetches. The query key hierarchy makes this straightforward—invalidating a parent key clears all child caches.

To skip the global error handler for a specific mutation, set `meta: { skipGlobalErrorHandler: true }` in the mutation options.

---

## Conventions Worth Following

- **Store secrets in `.env` files** — Never hardcode API URLs, keys, or tokens in source code
- **Use query keys from the factory** rather than hardcoding arrays—this prevents typos and ensures consistency
- **Type your API responses** explicitly in axios calls for better type inference
- **Derive payload types from entity types** using `Omit` to exclude auto-generated fields like `id`
- **Invalidate caches after mutations** to keep the UI in sync with the server

---

## Libraries

| Library               | Purpose                    |
|-----------------------|----------------------------|
| axios                 | HTTP client                |
| @tanstack/react-query | Server state management    |
| sonner                | Toast notifications        |
| zod                   | Schema validation          |
| react-hook-form       | Form handling              |

---

## Adding a New Resource

When introducing a new API resource:

1. Add types to `lib/api/v1/types.ts`
2. Add query keys to `lib/api/v1/query-key-factory.ts`
3. Create `lib/api/v1/[resource]/queries.ts` for GET operations
4. Create `lib/api/v1/[resource]/actions.ts` for mutations
5. Use `useQuery` and `useMutation` in components with the appropriate keys and functions
