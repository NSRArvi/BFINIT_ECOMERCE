import StorefrontLayout from "@/layouts/StorefrontLayout";
import Contact from "@/pages/storefront/Contact";
import ContentPage from "@/pages/storefront/ContentPage";
import Home from "@/features/storefront/pages/Home";
import ProductDetails from "@/features/storefront/pages/ProductDetails";
import ShopPage from "@/pages/storefront/Shop";
import CartProvider from "@/features/storefront/providers/CartProvider";
import PrivateRoute from "./PrivateRoute";
import NotFound from "@/pages/storefront/NotFound";
import Orders from "@/features/storefront/pages/Orders";
import Blogs from "@/pages/storefront/Blogs";
import BlogDetails from "@/pages/storefront/BlogDetails";
import CountryProvider from "@/providers/CountryProvider";
import Cart from "@/features/storefront/pages/Cart";
import Signup from "@/features/storefront/pages/Signup";
import Login from "@/features/storefront/pages/Login";
import Checkout from "@/features/storefront/pages/Checkout";
import CustomerAuthProvider from "@/features/storefront/providers/CustomerAuthProvider";
import OrderDetails from "@/features/storefront/pages/OrderDetails";

export const storeFrontRoutes = {
  path: "/stores/:storeId",
  element: (
    <CountryProvider>
      <CustomerAuthProvider>
        <CartProvider>
          <StorefrontLayout />
        </CartProvider>
      </CustomerAuthProvider>
    </CountryProvider>
  ),
  children: [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      index: true,
      element: <Home />,
    },
    {
      path: "shop",
      element: <ShopPage />,
    },
    {
      path: "shop/:slug",
      element: <ProductDetails />,
    },
    {
      path: "about",
      element: (
        <ContentPage title="About Us" apiEndpoint="/store/publicAboutData" />
      ),
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "checkout",
      element: (
        // <PrivateRoute role="customer">
        <Checkout />
        // </PrivateRoute>
      ),
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "support/customer-support",
      element: (
        <ContentPage title="Customer Support" apiEndpoint="/store/storehelp" />
      ),
    },
    {
      path: "support/return-policy",
      element: (
        <ContentPage title="Return Policy" apiEndpoint="/store/return&refund" />
      ),
    },
    {
      path: "support/terms-and-conditions",
      element: (
        <ContentPage title="Legal & Terms" apiEndpoint="/store//storeterms" />
      ),
    },
    {
      path: "support/shopping-guide",
      element: (
        <ContentPage title="Shopping Guide" apiEndpoint="/store/howtobuy" />
      ),
    },
    {
      path: "support/faq",
      element: <ContentPage title="FAQ" apiEndpoint="/faq/public" />,
    },
    {
      path: "support/privacy",
      element: (
        <ContentPage
          title="Privacy Policy"
          apiEndpoint="/privacypolicy/public"
        />
      ),
    },
    {
      path: "blog",
      element: <Blogs />,
    },
    {
      path: "blog/:id",
      element: <BlogDetails />,
    },
    {
      path: "orders",
      element: (
        // <PrivateRoute role="customer">
        <Orders />
        // </PrivateRoute>
      ),
    },
    {
      path: "orders/:orderId",
      element: (
        // <PrivateRoute role="customer">
        <OrderDetails />
        // </PrivateRoute>
      ),
    },
  ],
};
