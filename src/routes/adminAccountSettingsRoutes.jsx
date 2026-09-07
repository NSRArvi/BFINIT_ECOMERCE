import { Navigate } from "react-router";
import PrivateRoute from "./PrivateRoute";
import AdminAccountSettingsLayout from "@/layouts/AdminAccountSettingsLayout";
import Billing from "@/features/admin/pages/Billing";
import BillingPlans from "@/features/admin/pages/BillingPlans";

export const adminAccountSettingsRoutes = {
  path: "/account",
  element: (
    <PrivateRoute role="user">
      <AdminAccountSettingsLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <Navigate to="billing" replace /> },
    {
      path: "billing",
      element: <Billing />,
    },
    {
      path: "billing/plans",
      element: <BillingPlans />,
    },
  ],
};
