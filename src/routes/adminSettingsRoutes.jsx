import { Navigate } from "react-router";
import PrivateRoute from "./PrivateRoute";
import AdminSettingsLayout from "@/layouts/AdminSettingsLayout";
import Domain from "@/features/admin/pages/Domain";
import Subdomain from "@/features/admin/pages/Subdomain";
import StripePayments from "@/features/admin/pages/StripePayments";
import BankForm from "@/features/admin/pages/BankForm";
import ManageBank from "@/features/admin/pages/ManageBank";
import ShippingZones from "@/features/admin/pages/ShippingZones";
import ShippingZoneForm from "@/features/admin/pages/ShippingZoneForm";
import PrivacyPolicy from "@/features/admin/pages/PrivacyPolicy";
import TermsAndConditions from "@/features/admin/pages/TermsAndConditions";
import ReturnPolicy from "@/features/admin/pages/ReturnPolicy";
import CustomerSupport from "@/features/admin/pages/CustomerSupport";
import FAQ from "@/features/admin/pages/FAQ";
import ShoppingGuide from "@/features/admin/pages/ShoppingGuide";
import AboutUs from "@/features/admin/pages/AboutUs";

export const adminSettingsRoutes = {
  path: "/settings",
  element: (
    <PrivateRoute role="user">
      <AdminSettingsLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <Navigate to="domain" replace /> },
    {
      path: "domain",
      element: <Domain />,
    },
    {
      path: "subdomain",
      element: <Subdomain />,
    },
    {
      path: "payments/stripe",
      element: <StripePayments />,
    },
    {
      path: "payments/manage-bank",
      element: <ManageBank />,
    },
    {
      path: "payments/bank/add",
      element: <BankForm />,
    },
    {
      path: "payments/bank/edit/:id",
      element: <BankForm />,
    },
    {
      path: "shipping-zones",
      element: <ShippingZones />,
    },
    {
      path: "shipping-zones/add",
      element: <ShippingZoneForm />,
    },
    {
      path: "shipping-zones/edit/:id/:storeId",
      element: <ShippingZoneForm />,
    },
    {
      path: "legal/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "legal/terms-and-conditions",
      element: <TermsAndConditions />,
    },
    {
      path: "legal/return-policy",
      element: <ReturnPolicy />,
    },
    {
      path: "support/customer-support",
      element: <CustomerSupport />,
    },
    {
      path: "support/faq",
      element: <FAQ />,
    },
    {
      path: "support/shopping-guide",
      element: <ShoppingGuide />,
    },
    {
      path: "company/about",
      element: <AboutUs />,
    },
  ],
};
