import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import ProfileDropdown from "@/features/admin/components/layout/ProfileDropdown";
import StoreSwitcherDropdown from "@/features/admin/components/layout/StoreSwticherDropdown";
import useAuth from "@/hooks/auth/useAuth";
import logo from "@/assets/logo/bfinit.png";

export default function DashboardNavbar({ showSideNav, setShowSideNav }) {
  const location = useLocation();
  const { isSuperAdmin } = useAuth();

  const isSettingsRoute = location.pathname.startsWith("/settings");
  const homePageUrl = isSuperAdmin ? "/super-admin/packages" : "/";

  return (
    <nav className="bg-background fixed top-0 z-50 flex w-full items-center justify-between border-b px-3 py-2 sm:px-5 sm:py-1.5">
      {/* mobile sidebar toggle */}
      <button
        onClick={() => setShowSideNav((prev) => !prev)}
        className="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-neutral-50 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {showSideNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* logo */}
      <Link to={homePageUrl}>
        <img src={logo} alt="bfinit logo" className="w-16 lg:w-20 lg:py-1" />
      </Link>

      {/* desktop store switcher */}
      {!isSettingsRoute && <StoreSwitcherDropdown />}

      {/* profile dropdown */}
      <ProfileDropdown />
    </nav>
  );
}
