import AdminLayout from "@/layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import Home from "@/features/admin/pages/Home";
import Themes from "@/features/admin/pages/Themes";
import Categories from "@/features/admin/pages/Categories";
import Subcategories from "@/features/admin/pages/Subcategories";
import Brands from "@/features/admin/pages/Brands";
import AddProduct from "@/features/admin/pages/AddProduct";
import Inventory from "@/features/admin/pages/Inventory";
import Orders from "@/features/admin/pages/Orders";
import OrderDetails from "@/features/admin/pages/OrderDetails";
import SeoForm from "@/features/admin/pages/SeoForm";
import ManageBlog from "@/features/admin/pages/ManageBlog";
import Domains from "@/features/admin/pages/Domains";
import StripePayments from "@/features/admin/pages/StripePayments";
import HelpCenterForm from "@/features/admin/pages/HelpCenterForm";
import ReturnsRefundsForm from "@/features/admin/pages/ReturnsRefundsForm";
import TermsConditionsForm from "@/features/admin/pages/TermsConditionsForm";
import HowToBuyForm from "@/features/admin/pages/HowToBuyForm";
import Stores from "@/features/admin/pages/Stores";
import UpdateProduct from "@/features/admin/pages/UpdateProduct";
import AboutUs from "@/features/admin/pages/AboutUs";
import AddFaq from "@/features/admin/pages/AddFaq";
import BankPayment from "@/features/admin/pages/BankPayment";
import PrivacyPolicy from "@/features/admin/pages/PrivacyPolicy";
import OrdersManagement from "@/Test";
import Customers from "@/features/admin/pages/Customers";
import StoreForm from "@/features/admin/components/sections/store/StoreForm";
import BlogForm from "@/features/admin/pages/BlogForm";

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
      path: "/products/add-product",
      element: <AddProduct />,
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
      path: "/support/help-center",
      element: <HelpCenterForm />,
    },
    {
      path: "/support/returns-refunds",
      element: <ReturnsRefundsForm />,
    },
    {
      path: "/support/terms-conditions",
      element: <TermsConditionsForm />,
    },
    {
      path: "/support/privacy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/support/about",
      element: <AboutUs />,
    },
    {
      path: "/support/how-to-buy",
      element: <HowToBuyForm />,
    },
    {
      path: "/support/faq",
      element: <AddFaq />,
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
    {
      path: "products/edit/:productId",
      element: <UpdateProduct />,
    },
    {
      path: "test",
      element: <OrdersManagement />,
    },
  ],
};
