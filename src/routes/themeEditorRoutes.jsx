import PrivateRoute from "./PrivateRoute";
import Home from "@/features/storefront/pages/Home";
import NotFound from "@/pages/storefront/NotFound";
import CountryProvider from "@/providers/CountryProvider";
import ThemeEditorLayout from "@/features/admin/theme-editor/layout/ThemeEditorLayout";
import ThemeEditorProvider from "@/features/admin/theme-editor/providers/ThemeEditorProvider";
import CustomerAuthProvider from "@/features/storefront/providers/CustomerAuthProvider";
import CartProvider from "@/features/storefront/providers/CartProvider";

export const themeEditorRoutes = {
  path: "/stores/:storeId/theme-editor/:themeId",
  element: (
    <PrivateRoute role="user">
      <CountryProvider>
        <ThemeEditorProvider>
          <CustomerAuthProvider>
            <CartProvider>
              <ThemeEditorLayout />
            </CartProvider>
          </CustomerAuthProvider>
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
