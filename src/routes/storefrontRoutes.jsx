import Checkout from "@/components/storefront/checkout/Checkout";
import StorefrontLayout from "@/layouts/StorefrontLayout";
import Contact from "@/pages/storefront/Contact";
import ContentPage from "@/pages/storefront/ContentPage";
import Home from "@/features/storefront/pages/Home";
import Login from "@/pages/storefront/Login";
import ProductDetails from "@/features/storefront/pages/ProductDetails";
import ShopPage from "@/pages/storefront/Shop";
import Signup from "@/pages/storefront/Signup";
import CartProvider from "@/providers/CartProvider";
import StorefrontAuthProvider from "@/providers/StorefrontAuthProvider";
import PrivateRoute from "./PrivateRoute";
import NotFound from "@/pages/storefront/NotFound";
import Orders from "@/pages/storefront/Orders";
import Blogs from "@/pages/storefront/Blogs";
import BlogDetails from "@/pages/storefront/BlogDetails";
import CountryProvider from "@/providers/CountryProvider";
import Cart from "@/features/storefront/pages/Cart";

export const storeFrontRoutes = {
  path: "/stores/:storeId",
  element: (
    <CountryProvider>
      <StorefrontAuthProvider>
        <CartProvider>
          <StorefrontLayout />
        </CartProvider>
      </StorefrontAuthProvider>
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
      path: "checkout",
      element: (
        <PrivateRoute role="customer">
          <Checkout />
        </PrivateRoute>
      ),
    },
    {
      path: "orders",
      element: (
        <PrivateRoute role="customer">
          <Orders />
        </PrivateRoute>
      ),
    },
  ],
};
