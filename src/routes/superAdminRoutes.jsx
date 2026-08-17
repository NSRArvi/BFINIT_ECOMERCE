import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
const SuperAdminLayout = lazy(() => import("@/layouts/SuperAdminLayout"));
const Packages = lazy(() => import("@/features/super-admin/pages/Packages"));
const PackageForm = lazy(
  () => import("@/features/super-admin/pages/PackageForm"),
);
const BankAccounts = lazy(
  () => import("@/features/super-admin/pages/BankAccounts"),
);
const BankForm = lazy(
  () =>
    import("@/features/super-admin/components/sections/bank-accounts/BankForm"),
);
const Orders = lazy(() => import("@/features/super-admin/pages/Orders"));
const OrderDetails = lazy(
  () => import("@/features/super-admin/pages/OrderDetails"),
);
const DomainManagement = lazy(
  () => import("@/features/super-admin/pages/DomainManagement"),
);
const SubDomainManagement = lazy(
  () => import("@/features/super-admin/pages/SubDomainManagement"),
);

export const superAdminRoutes = {
  path: "/super-admin",
  element: (
    <PrivateRoute role="superadmin">
      <Suspense fallback={<div>Loading...</div>}>
        <SuperAdminLayout />
      </Suspense>
    </PrivateRoute>
  ),
  children: [
    { path: "packages", element: <Packages /> },
    { path: "packages/add-package", element: <PackageForm /> },
    { path: "packages/edit/:id", element: <PackageForm /> },
    { path: "orders", element: <Orders /> },
    { path: "orders/:invoiceId", element: <OrderDetails /> },
    { path: "bank-accounts", element: <BankAccounts /> },
    { path: "bank-accounts/new", element: <BankForm /> },
    { path: "bank-accounts/edit/:id", element: <BankForm /> },
    {
      path: "domains",
      element: <DomainManagement />,
    },
    {
      path: "subdomains",
      element: <SubDomainManagement />,
    },
  ],
};
