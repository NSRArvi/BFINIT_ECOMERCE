import StorefrontLayout from "@/layouts/StorefrontLayout";
import ContentPage from "@/pages/storefront/ContentPage";
import Home from "@/features/storefront/pages/Home";
import ProductDetails from "@/features/storefront/pages/ProductDetails";
import CartProvider from "@/features/storefront/providers/CartProvider";
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
import Shop from "@/features/storefront/pages/Shop";
import Contact from "@/features/storefront/pages/Contact";

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
      element: <Shop />,
    },
    {
      path: "shop/:slug",
      element: <ProductDetails />,
    },
    {
      path: "about",
      element: (
        <ContentPage title="About Us" apiEndpoint="/api/v1/general/about-all" />
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
        <ContentPage
          title="Customer Support"
          apiEndpoint="/api/v1/general/customerSupport-all"
        />
      ),
    },
    {
      path: "support/return-policy",
      element: (
        <ContentPage
          title="Return Policy"
          apiEndpoint="/api/v1/general/returnPolicies-all"
        />
      ),
    },
    {
      path: "support/terms-and-conditions",
      element: (
        <ContentPage
          title="Legal & Terms"
          apiEndpoint="/api/v1/general/termsAndCondition-all"
        />
      ),
    },
    {
      path: "support/shopping-guide",
      element: (
        <ContentPage
          title="Shopping Guide"
          apiEndpoint="/api/v1/general/shoppingGuide-all"
        />
      ),
    },
    {
      path: "support/faq",
      element: (
        <ContentPage title="FAQ" apiEndpoint="/api/v1/general/faq-all" />
      ),
    },
    {
      path: "support/privacy",
      element: (
        <ContentPage
          title="Privacy Policy"
          apiEndpoint="/api/v1/general/privacyPolicy-all"
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
