import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/auth/useAuth";
import useCustomerAuth from "@/features/storefront/hooks/useCustomerAuth";
import useBasePath from "@/hooks/useBasePath";

export default function PrivateRoute({ children, role = "" }) {
  const location = useLocation();
  const basePath = useBasePath();

  const { user } = useAuth();
  const { customer } = useCustomerAuth();

  const isSuperAdmin = user?.data?.roles?.find(
    (r) => r.role_name === "Super Admin" && r.scope === "platform",
  );

  // storefront customer authentication
  if (role === "customer") {
    return customer ? (
      children
    ) : (
      <Navigate
        to={`${basePath}/login`}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role === "superadmin" && !isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
