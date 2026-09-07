import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./publicRoutes";
import { adminRoutes } from "./adminRoutes";
import { themeEditorRoutes } from "./themeEditorRoutes";
import { superAdminRoutes } from "./superAdminRoutes";
import { storeFrontRoutes } from "./storefrontRoutes";
import { adminSettingsRoutes } from "./adminSettingsRoutes";
import { adminAccountSettingsRoutes } from "./adminAccountSettingsRoutes";

export const router = createBrowserRouter([
  ...publicRoutes,
  superAdminRoutes,
  adminRoutes,
  adminSettingsRoutes,
  adminAccountSettingsRoutes,
  themeEditorRoutes,
  storeFrontRoutes,
]);
