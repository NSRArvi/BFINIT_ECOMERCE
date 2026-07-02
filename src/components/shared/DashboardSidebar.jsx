import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, Store, LogOut, FileDown } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { adminDropdownLinks } from "@/utils/contstants";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetStores from "@/features/admin/hooks/useGetStores";
import GuidePrompt from "@/features/admin/components/GuidePrompt";

export default function DashboardSidebar({
  showSideNav,
  toggleSideNav,
  navGroups,
}) {
  const { user, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showStoreMenu, setShowStoreMenu] = useState(false);

  // Fetch client info
  const { data: clientInfo } = useGetQuery({
    endpoint: `/clients/${user?.data?.clientid}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["clientInfo", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });

  // Fetch stores
  const { data: stores } = useGetStores();
  const { selectedStore, selectStore } = useSelectedStore();

  // handle dropdown toggle on click
  const toggleDropdown = (groupIndex, linkIndex) => {
    const dropdownKey = `${groupIndex}-${linkIndex}`;

    if (openDropdown === dropdownKey) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownKey);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("authInfo");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isLinkActive = (url) => {
    return location.pathname === url;
  };

  const isDropdownActive = (subCategories) => {
    return subCategories?.some((subItem) => location.pathname === subItem.url);
  };

  const handleStoreSwitch = (store) => {
    selectStore(store);
    setShowStoreMenu(false);
  };

  return (
    <aside
      className={`custom-scrollbar-hide bg-background fixed top-[55px] left-0 z-10 flex h-[calc(100dvh-55px)] flex-col gap-4 overflow-y-auto p-2 text-sm transition-all duration-300 ease-in-out lg:static lg:w-1/6 lg:min-w-[231px] lg:translate-x-0 ${
        showSideNav ? "w-4/5 translate-x-0 md:w-1/3" : "-translate-x-full"
      }`}
    >
      {/* Mobile Only: User Profile & Store Switcher */}
      <div className="space-y-2 lg:hidden">
        {/* User Profile Dropdown - IMPROVED */}
        <div className="border-b border-slate-200 pb-2">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex w-full items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-dashboard-primary flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold text-white">
                {clientInfo?.data?.clientFname?.[0]}
                {clientInfo?.data?.clientLname?.[0]}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs leading-tight font-semibold text-slate-900">
                  {clientInfo?.data?.clientFname}{" "}
                  {clientInfo?.data?.clientLname}
                </span>
                <span className="text-[11px] leading-tight text-slate-500">
                  {clientInfo?.data?.clientEmail}
                </span>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                showUserMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* User Menu Items - IMPROVED */}
          {showUserMenu && (
            <div className="mt-1.5 space-y-0.5 px-1">
              {adminDropdownLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.url}
                  onClick={toggleSideNav}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <link.icon className="h-4 w-4 text-slate-600" />
                  <span className="capitalize">{link.name}</span>
                </Link>
              ))}

              <a
                href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleSideNav}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <FileDown className="h-4 w-4 text-slate-600" />
                <span>Get Help Guide</span>
              </a>

              <div className="mt-0.5 border-t border-slate-200 pt-0.5">
                <button
                  onClick={handleLogOut}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Store Switcher Dropdown - IMPROVED */}
        <div className="border-b border-slate-200 pb-2">
          <button
            onClick={() => setShowStoreMenu(!showStoreMenu)}
            className="flex w-full items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white">
                <Store className="h-4 w-4 text-slate-600" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] leading-tight font-medium tracking-wide text-slate-500 uppercase">
                  Current Store
                </span>
                <span className="text-xs leading-tight font-semibold text-slate-900">
                  {selectedStore?.storeName || "Select store"}
                </span>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                showStoreMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Store Menu Items - IMPROVED */}
          {showStoreMenu && (
            <div className="mt-1.5 max-h-[280px] space-y-0.5 overflow-y-auto px-1">
              {stores && stores?.data?.length > 0 ? (
                <>
                  {stores?.data?.map((store) => (
                    <button
                      key={store?.storeId}
                      onClick={() => handleStoreSwitch(store)}
                      className={`flex w-full items-center gap-2.5 rounded-md p-2 text-left transition-colors ${
                        selectedStore?.storeId === store?.storeId
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100">
                        <Store className="h-4 w-4 text-slate-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-xs leading-tight font-medium text-slate-900">
                            {store?.storeName}
                          </span>
                          {selectedStore?.storeId === store?.storeId && (
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>
                        {store?.storeDomain && (
                          <span className="mt-0.5 block truncate text-[11px] leading-tight text-slate-500">
                            {store.storeDomain}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <Store className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-900">
                    No stores yet
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Create your first store to start
                  </p>
                  <Link
                    to="/stores/create"
                    onClick={toggleSideNav}
                    className="bg-dashboard-primary mt-3 inline-block rounded-md px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Create Store
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="custom-scrollbar-hide flex flex-1 flex-col gap-1.5 overflow-y-auto">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <p className="my-2.5 px-4 text-[10px] font-medium tracking-wider text-[#9CA3AF] uppercase">
              {group.groupName}
            </p>

            <div className="space-y-0.5">
              {group.links.map((navMenuItem, linkIndex) =>
                navMenuItem.subCategories ? (
                  <div key={linkIndex}>
                    <button
                      onClick={() => toggleDropdown(groupIndex, linkIndex)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 transition-all duration-200 ease-linear ${
                        isDropdownActive(navMenuItem.subCategories)
                          ? "text-dashboard-primary bg-[#EFF6FF]"
                          : "hover:bg-[#F4F5F9]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <navMenuItem.icon
                          size={18}
                          className={`shrink-0 ${
                            isDropdownActive(navMenuItem.subCategories)
                              ? "text-dashboard-primary"
                              : "text-[#6B7280]"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            isDropdownActive(navMenuItem.subCategories)
                              ? "text-dashboard-primary"
                              : "text-[#4B5563]"
                          }`}
                        >
                          {navMenuItem.name}
                        </span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-[#6B7280] transition-transform duration-200 ease-linear ${
                          openDropdown === `${groupIndex}-${linkIndex}`
                            ? "rotate-180"
                            : "rotate-0"
                        } ${
                          isDropdownActive(navMenuItem.subCategories)
                            ? "text-dashboard-primary"
                            : "text-[#6B7280]"
                        }`}
                      />
                    </button>

                    {/* Subcategories dropdown */}
                    <div
                      className={`mt-1 ml-4 grid overflow-hidden border-l border-[#E5E7EB] pl-4 opacity-100 transition-all duration-200 ease-linear ${
                        openDropdown === `${groupIndex}-${linkIndex}`
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 space-y-0.5">
                        {navMenuItem.subCategories.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            onClick={toggleSideNav}
                            to={subItem.url}
                            className={`flex items-center gap-2 overflow-hidden rounded-md py-1.5 transition-colors duration-200 ease-linear md:px-3 ${
                              isLinkActive(subItem.url)
                                ? "text-dashboard-primary"
                                : "text-[#6B7280] hover:bg-[#F4F5F9]"
                            }`}
                          >
                            <subItem.icon
                              size={14}
                              className={`shrink-0 ${
                                isLinkActive(subItem.url)
                                  ? "text-dashboard-primary"
                                  : "text-[#9CA3AF]"
                              }`}
                            />
                            <span
                              className={`text-xs ${
                                isLinkActive(subItem.url)
                                  ? "text-dashboard-primary font-medium"
                                  : "text-[#4B5563]"
                              }`}
                            >
                              {subItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={linkIndex}
                    onClick={toggleSideNav}
                    to={navMenuItem.url}
                    className={`flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200 ease-linear ${
                      isLinkActive(navMenuItem.url)
                        ? "bg-[#EFF6FF]"
                        : "hover:bg-[#F4F5F9]"
                    }`}
                  >
                    <navMenuItem.icon
                      size={18}
                      className={`shrink-0 ${
                        isLinkActive(navMenuItem.url)
                          ? "text-dashboard-primary"
                          : "text-[#6B7280]"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isLinkActive(navMenuItem.url)
                          ? "text-dashboard-primary"
                          : "text-[#4B5563]"
                      }`}
                    >
                      {navMenuItem.name}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* guide download btn */}
      {!isSuperAdmin && <GuidePrompt />}
    </aside>
  );
}
