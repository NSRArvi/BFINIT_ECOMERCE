import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import StoreSelectionModal from "@/features/admin/components/modals/StoreSelectionModal";
import { adminNavGroups } from "@/features/admin/config/adminNavGroups";
import useAuth from "@/hooks/auth/useAuth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { isSuperAdmin } = useAuth();

  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isSuperAdmin) {
      navigate("/super-admin/packages");
    }
  }, [isSuperAdmin, navigate]);

  const toggleSideNav = () => {
    setShowSideNav((prev) => !prev);
  };

  if (isSuperAdmin) {
    return null;
  }

  return (
    <div className="font-inter h-dvh w-full overflow-hidden">
      {/* Store Selection Modal */}
      <StoreSelectionModal />

      {/* Fixed Top Bar */}
      <DashboardNavbar
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
      />

      {/* Layout Body (Sidebar + Main Content) */}
      <div className="flex h-dvh pt-[55px]">
        {/* Sidebar */}
        <DashboardSidebar
          showSideNav={showSideNav}
          toggleSideNav={toggleSideNav}
          navGroups={adminNavGroups}
        />

        {/* Scrollable Content */}
        <div className="custom-scrollbar bg-muted/50 flex-1 overflow-y-auto rounded-2xl p-5">
          <Outlet />
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}
