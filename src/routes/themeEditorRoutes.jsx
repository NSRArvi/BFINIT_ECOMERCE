import PrivateRoute from "./PrivateRoute";
import CartProvider from "@/providers/CartProvider";
import Home from "@/features/storefront/pages/Home";
import StorefrontAuthProvider from "@/providers/StorefrontAuthProvider";
import NotFound from "@/pages/storefront/NotFound";
import CountryProvider from "@/providers/CountryProvider";
import ThemeEditorLayout from "@/features/admin/theme-editor/layout/ThemeEditorLayout";
import ThemeEditorProvider from "@/features/admin/theme-editor/providers/ThemeEditorProvider";

export const themeEditorRoutes = {
  path: "/stores/:storeId/theme-editor/:themeId",
  element: (
    <PrivateRoute role="user">
      <CountryProvider>
        <ThemeEditorProvider>
          <StorefrontAuthProvider>
            <CartProvider>
              <ThemeEditorLayout />
            </CartProvider>
          </StorefrontAuthProvider>
        </ThemeEditorProvider>
      </CountryProvider>
    </PrivateRoute>
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
  ],
};
