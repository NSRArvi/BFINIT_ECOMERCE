import AdminLayout from "@/layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import Home from "@/features/admin/pages/Home";
import Themes from "@/features/admin/pages/Themes";
import Categories from "@/features/admin/pages/Categories";
import Subcategories from "@/features/admin/pages/Subcategories";
import Brands from "@/features/admin/pages/Brands";
import Inventory from "@/features/admin/pages/Inventory";
import Orders from "@/features/admin/pages/Orders";
import OrderDetails from "@/features/admin/pages/OrderDetails";
import SeoForm from "@/features/admin/pages/SeoForm";
import ManageBlog from "@/features/admin/pages/ManageBlog";
import Domains from "@/features/admin/pages/Domains";
import StripePayments from "@/features/admin/pages/StripePayments";
import CustomerSupport from "@/features/admin/pages/CustomerSupport";
import ReturnPolicy from "@/features/admin/pages/ReturnPolicy";
import TermsAndConditions from "@/features/admin/pages/TermsAndConditions";
import ShoppingGuide from "@/features/admin/pages/ShoppingGuide";
import Stores from "@/features/admin/pages/Stores";
import AboutUs from "@/features/admin/pages/AboutUs";
import FAQ from "@/features/admin/pages/FAQ";
import BankPayment from "@/features/admin/pages/BankPayment";
import PrivacyPolicy from "@/features/admin/pages/PrivacyPolicy";
import Customers from "@/features/admin/pages/Customers";
import StoreForm from "@/features/admin/components/sections/store/StoreForm";
import ManageBank from "@/features/admin/pages/ManageBank";
import UpdateBank from "@/features/admin/pages/UpdateBank";
import BlogForm from "@/features/admin/pages/BlogForm";
import ProductForm from "@/features/admin/pages/ProductForm";
import ShippingZones from "@/features/admin/pages/ShippingZones";
import ShippingZoneForm from "@/features/admin/pages/ShippingZoneForm";

export const adminRoutes = {
  path: "/",
  element: (
    <PrivateRoute role="user">
      <AdminLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/themes",
      element: <Themes />,
    },
    {
      path: "/products/category",
      element: <Categories />,
    },
    {
      path: "/products/sub-category",
      element: <Subcategories />,
    },
    {
      path: "/products/brands",
      element: <Brands />,
    },
    {
      path: "/products/inventory/add",
      element: <ProductForm />,
    },
    {
      path: "/products/inventory",
      element: <Inventory />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/orders/:orderId",
      element: <OrderDetails />,
    },
    {
      path: "/seo-meta",
      element: <SeoForm />,
    },
    {
      path: "/customers",
      element: <Customers />,
    },
    {
      path: "/blogs/add",
      element: <BlogForm />,
    },
    {
      path: "/blogs/edit/:id",
      element: <BlogForm />,
    },
    {
      path: "/blogs/manage",
      element: <ManageBlog />,
    },
    {
      path: "/domains",
      element: <Domains />,
    },
    {
      path: "/payments/stripe",
      element: <StripePayments />,
    },
    {
      path: "/payments/bank",
      element: <BankPayment />,
    },
    {
      path: "/payments/manage-bank",
      element: <ManageBank />,
    },
    {
      path: "/payment/edit/:id",
      element: <UpdateBank />,
    },
    {
      path: "/shipping-zones",
      element: <ShippingZones />,
    },
    {
      path: "/shipping-zones/add",
      element: <ShippingZoneForm />,
    },
    {
      path: "/shipping-zones/edit/:id/:storeId",
      element: <ShippingZoneForm />,
    },
    {
      path: "/support/customer-support",
      element: <CustomerSupport />,
    },
    {
      path: "/legal/return-policy",
      element: <ReturnPolicy />,
    },
    {
      path: "/legal/terms-and-conditions",
      element: <TermsAndConditions />,
    },
    {
      path: "/legal/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/company/about",
      element: <AboutUs />,
    },
    {
      path: "/support/shopping-guide",
      element: <ShoppingGuide />,
    },
    {
      path: "/support/faq",
      element: <FAQ />,
    },
    {
      path: "/stores",
      element: <Stores />,
    },
    {
      path: "stores/create",
      element: <StoreForm />,
    },
    {
      path: "stores/edit/:id",
      element: <StoreForm />,
    },
  ],
};
