import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, ChevronLeft, Settings, Store } from "lucide-react";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetStores from "@/features/admin/hooks/useGetStores";
import GuidePrompt from "@/features/admin/components/GuidePrompt";
import { getImgUrl } from "@/utils/getImgUrl";

export default function DashboardSidebar({
  showSideNav,
  toggleSideNav,
  navGroups,
}) {
  const location = useLocation();
  const { isSuperAdmin } = useAuth();
  const { selectStore, activeStore } = useSelectedStore();

  const { data: stores } = useGetStores();

  const [openDropdown, setOpenDropdown] = useState("");
  const [showStoreMenu, setShowStoreMenu] = useState(false);

  const isSettingsRoute = location.pathname.startsWith("/settings");

  const toggleDropdown = (groupIndex, linkIndex) => {
    const dropdownKey = `${groupIndex}-${linkIndex}`;

    if (openDropdown === dropdownKey) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownKey);
    }
  };

  const isLinkActive = (url) => {
    return location.pathname === url;
  };

  const isDropdownActive = (subCategories) => {
    return subCategories?.some((subItem) => location.pathname === subItem.url);
  };

  let sidebarFooterContent = null;

  if (isSuperAdmin) {
    sidebarFooterContent = null;
  } else if (isSettingsRoute) {
    sidebarFooterContent = (
      <Link
        to="/"
        className="flex items-center gap-3 rounded-md px-4 py-2 text-xs font-medium text-[#4B5563] transition-all duration-200 ease-linear hover:bg-[#F4F5F9]"
      >
        <ChevronLeft size={18} className="text-[#6B7280]" /> Back to Home
      </Link>
    );
  } else {
    sidebarFooterContent = (
      <>
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-md px-4 py-2 text-xs font-medium text-[#4B5563] transition-all duration-200 ease-linear hover:bg-[#F4F5F9]"
        >
          <Settings size={18} className="text-[#6B7280]" /> Settings
        </Link>

        <GuidePrompt />
      </>
    );
  }

  return (
    <aside
      className={`custom-scrollbar-hide bg-background fixed top-[55px] left-0 z-10 flex h-[calc(100dvh-55px)] flex-col gap-4 overflow-y-auto p-2 text-sm transition-all duration-300 ease-in-out lg:static lg:w-1/6 lg:min-w-[231px] lg:translate-x-0 ${
        showSideNav ? "w-4/5 translate-x-0 md:w-1/3" : "-translate-x-full"
      }`}
    >
      {/* Mobile Only: User Profile & Store Switcher */}
      {!isSettingsRoute && (
        <div className="space-y-2 lg:hidden">
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
                    {activeStore?.storeName || "Select store"}
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
                {stores && stores?.data?.data?.length > 0 ? (
                  <>
                    {stores?.data?.data?.map((store) => (
                      <button
                        key={store?.id}
                        onClick={() => selectStore(store)}
                        className={`flex w-full items-center gap-2.5 rounded-md p-2 text-left transition-colors ${
                          activeStore?.id === store?.id
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
                              {store?.name}
                            </span>
                            {activeStore?.id === store?.id && (
                              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>
                          {store?.public_subdomain && (
                            <span className="mt-0.5 block truncate text-[11px] leading-tight text-slate-500">
                              {store.public_subdomain}.bfinit.com
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
      )}

      {/* current selected store info for admin settings layout */}
      {isSettingsRoute && (
        <div className="mb-1 flex items-center gap-2.5 border-b px-4 pt-1 pb-4">
          <img
            src={getImgUrl(activeStore?.logo)}
            alt={activeStore?.name}
            className="size-8 shrink-0 rounded-sm border object-contain"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-wider text-[#9CA3AF] uppercase">
              Configuring
            </p>
            <p className="truncate text-xs font-medium">{activeStore?.name}</p>
          </div>
        </div>
      )}

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

      {/* guide prompt and home/settings links */}
      {sidebarFooterContent}
    </aside>
  );
}
