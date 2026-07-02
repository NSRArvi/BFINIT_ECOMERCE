# Git Commit Convention

## Format

```
<type>(<scope>): <description>
```

- **scope is optional** — skip it for chores, dependency updates, or project-wide changes
- **description** — lowercase, imperative mood, no period at the end ("add" not "added" or "adds")

---

## Types

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature or user-facing functionality        |
| `fix`      | Bug fix                                         |
| `refactor` | Code change that is neither a fix nor a feature |
| `style`    | Visual/design-only changes, no logic change     |
| `chore`    | Maintenance — deps, config, tooling             |
| `docs`     | Documentation only                              |

---

## Scopes

Use the feature or area being changed.

| Scope             | Area                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| `auth`            | Admin/staff login, useAuth, AuthProvider, AuthContext                     |
| `storefront-auth` | Customer login, useStorefrontAuth, StorefrontAuthProvider                 |
| `private-route`   | PrivateRoute gatekeeper, role checks, redirects                           |
| `routes`          | Route definitions — superAdminRoutes, adminRoutes, storefrontRoutes, etc. |
| `store`           | Store creation, store switcher, SelectedStoreProvider                     |
| `categories`      | Category management page                                                  |
| `orders`          | Orders page                                                               |
| `theme-editor`    | Theme editor layout, canvas, inspector, sidebar                           |
| `guide-prompt`    | GuidePrompt component                                                     |
| `packages`        | Subscription / package limits                                             |
| `shared`          | Shared components (EmptyState, TablePagination, etc.)                     |
| `layout`          | AdminLayout, SuperAdminLayout, StorefrontLayout shells                    |
| `sidebar`         | DashboardSidebar, DashboardNavbar, role-aware nav                         |
| `cart`            | CartProvider, cart state                                                  |
| `storefront`      | Storefront pages, StorefrontThemeProvider, CountryProvider                |

Add new scopes as features grow. Keep them lowercase and hyphenated.

---

## Examples

```bash
feat(categories): add bulk delete with confirmation dialog
fix(store-switcher): prevent modal from showing on single-store auto-select
refactor(empty-state): add onAction prop and className override
style(guide-prompt): refine layout and typography
feat(private-route): add superadmin role and scope verification
fix(auth): persist roles array to localStorage on login
feat(sidebar): show super admin nav group based on isSuperAdmin
refactor(routes): extract storefront routes into separate file
chore: update dependencies
docs(packages): add JSDoc to usePackageInfo hook
```

---

## Branch Naming

```
<type>/<scope>-<short-description>
```

```bash
feat/categories-bulk-delete
fix/store-switcher-modal-visibility
style/guide-prompt-layout
refactor/empty-state-props
```

---

## Rules

- One branch = one reviewable unit of work
- Commit per feature, not per day
- Batch only when changes are tightly coupled (e.g. a hook and its consumer)
- Push when the feature branch is complete, not after every commit
- Scope is optional for `chore` and `docs` when the change is project-wide
