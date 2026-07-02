# BFINIT E-Commerce Admin Panel

React-based multi-tenant SaaS ecommerce admin panel with super admin and regular admin roles.

## Stack

- React, Tailwind CSS, Shadcn UI, TanStack Query, React Hook Form, React Router, Lucide icons
- Native fetch (no Axios)
- JavaScript only — no TypeScript

## Folder Structure

```
src/
  features/admin/        # Admin feature pages and hooks
  features/superadmin/   # Super admin feature pages
  components/shared/     # Reusable UI components (EmptyState, TablePagination, etc.)
  components/ui/         # Shadcn primitives only — do not add custom components here
  lib/                   # Foundational config (baseUrl in api.js)
  hooks/                 # Global hooks (useGetQuery, useUpdateMutation, useAuth, etc.)
  routes/                # Route definitions and PrivateRoute
```

## Code Conventions

- Use semantic design tokens only — never raw colors like `red-500` or `blue-600`
- Prefer `text-xs` and `text-sm` for admin panel components
- Flat conditional rendering over nested ternaries
- `Button asChild` + React Router `Link` over `onClick` + `useNavigate`
- Mutation aliases: `mutate: update`, `mutate: remove` (never `delete`)
- Pending states: `isUpdating`, `isDeleting`
- `handle` prefix only for DOM event handlers
- Query keys: `["resource"]` for lists, `["resource", id]` for detail views
- Named constants for localStorage keys; context methods own their cleanup

## Git Workflow

When asked to commit and push, always follow these steps in order:

1. Run `git status` to check what has changed
2. Run `git diff` to review the actual changes
3. Run `git add .`
4. Write a commit message following `GIT_CONVENTION.md`
5. Run `git push` to the current branch — never switch branches or create new ones unless explicitly asked

Commit convention is defined in `GIT_CONVENTION.md`. Always read it before writing a commit message.

## Key Patterns

- `useGetQuery` — custom TanStack Query wrapper for all data fetching
- `useUpdateMutation` — custom mutation wrapper for updates
- `useAuth` — admin/staff auth (localStorage key: `authInfo`)
- `useStorefrontAuth` — customer auth (localStorage key: `customerAuthInfo`)
- `useSelectedStore` — active store from `SelectedStoreProvider`
- `usePackageInfo(invoiceNumber)` — subscription/plan limits
- URL-driven pagination via `useSearchParams`; `TablePagination` accepts `meta` prop
