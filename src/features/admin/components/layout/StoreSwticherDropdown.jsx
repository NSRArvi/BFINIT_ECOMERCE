import { Link } from "react-router";
import {
  Loader2,
  Store,
  Plus,
  Check,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetStores from "@/features/admin/hooks/useGetStores";
import usePackageInfo from "../../hooks/usePackageInfo";
import { getImgUrl } from "@/utils/getImgUrl";
import { cn } from "@/lib/utils";

export default function StoreSwitcherDropdown() {
  const { selectStore, activeStore } = useSelectedStore();

  const { data: packageInfo } = usePackageInfo();
  const { data, isLoading } = useGetStores();

  const stores = data?.data?.data ?? [];
  const hasStores = stores?.length > 0;
  const maxStoreLimit = packageInfo?.data?.package_upgrade?.package?.max_store;
  const isStoreLimitExceeded = stores?.length >= maxStoreLimit;

  let btnContent = null;
  let content = null;

  if (isLoading) {
    btnContent = (
      <>
        <Store className="text-muted-foreground h-4 w-4" />
        <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
      </>
    );
  }

  if (!hasStores) return null;

  if (!isLoading && activeStore) {
    btnContent = (
      <>
        <div className="bg-muted flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-md border">
          <img
            src={getImgUrl(activeStore?.logo)}
            alt={activeStore?.name}
            className="h-full w-full object-contain"
          />
        </div>

        <span className="max-w-[120px] truncate text-xs font-normal">
          {activeStore?.name || "Select store"}
        </span>

        <ChevronsUpDown className="text-muted-foreground size-3.5 shrink-0" />
      </>
    );
  }

  // store list
  if (!isLoading && hasStores) {
    content = (
      <>
        <div className="max-h-72 space-y-2 overflow-y-auto p-1.5">
          {stores.map((store) => (
            <DropdownMenuItem
              key={store.id}
              onClick={() => selectStore(store)}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors",
                activeStore?.id === store.id && "bg-accent cursor-default",
              )}
            >
              {/* Store Logo */}
              <div className="bg-muted flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                <img
                  src={getImgUrl(store.logo)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Store Info */}
              <div className="min-w-0 flex-1">
                <span className="block truncate text-xs">{store.name}</span>
                {store.public_subdomain && (
                  <span className="text-muted-foreground block truncate text-[10px]">
                    {store.public_subdomain}.bfinit.com
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <div className="px-3 py-1">
          <DropdownMenuItem asChild>
            <Link
              to="/stores"
              className="text-muted-foreground flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs"
            >
              <Settings className="size-3.5" />
              Manage Stores
            </Link>
          </DropdownMenuItem>

          {!isStoreLimitExceeded && (
            <DropdownMenuItem asChild>
              <Link
                to="/stores/create"
                className="group flex cursor-pointer items-center gap-2 rounded px-2.5 py-1.5"
              >
                <Plus className="text-muted-foreground group-hover:text-foreground size-4 shrink-0" />
                <span className="text-muted-foreground group-hover:text-foreground text-xs">
                  Create New Store
                </span>
              </Link>
            </DropdownMenuItem>
          )}
        </div>
      </>
    );
  }

  // empty store
  if (!hasStores) {
    content = (
      <div className="px-3 py-1">
        <div className="px-2.5 py-4 text-center">
          <div className="bg-muted mx-auto mb-2.5 flex size-9 items-center justify-center rounded border">
            <Store className="text-muted-foreground size-4" />
          </div>
          <p className="text-sm font-medium">No stores yet</p>
          <p className="text-muted-foreground mt-0.5 text-[11px] leading-tight">
            Create your first store to start selling
          </p>
        </div>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem asChild>
          <Link
            to="/stores/create"
            className="group flex cursor-pointer items-center gap-2 rounded px-2.5 py-1.5"
          >
            <Plus className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
            <span className="text-muted-foreground group-hover:text-foreground text-xs transition-colors">
              Create New Store
            </span>
          </Link>
        </DropdownMenuItem>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="group hover:bg-accent hidden cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 shadow-none transition-all lg:flex"
        >
          {btnContent}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        {/* Header */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
              Your Stores
            </h3>
            {hasStores && maxStoreLimit && (
              <span className="text-muted-foreground text-[10px] tabular-nums">
                {stores.length} / {maxStoreLimit}
              </span>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
