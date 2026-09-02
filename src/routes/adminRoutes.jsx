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
import ManageBlog from "@/features/admin/pages/ManageBlog";
import Stores from "@/features/admin/pages/Stores";
import Customers from "@/features/admin/pages/Customers";
import StoreForm from "@/features/admin/components/sections/store/StoreForm";
import BlogForm from "@/features/admin/pages/BlogForm";
import ProductForm from "@/features/admin/pages/ProductForm";

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
