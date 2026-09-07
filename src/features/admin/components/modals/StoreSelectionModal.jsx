import { useEffect } from "react";
import { Link } from "react-router";
import {
  ChevronRight,
  CircleFadingPlusIcon,
  Plus,
  SquarePlus,
  Store,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/auth/useAuth";
import useGetStores from "../../hooks/useGetStores";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePackageInfo from "../../hooks/usePackageInfo";
import { BASE_URL } from "@/lib/api";
import { Separator } from "@/components/ui/separator";

const Empty_Stores = [];

export default function StoreSelectionModal() {
  const { token } = useAuth();
  const { activeStore, selectStore } = useSelectedStore();

  const { data: packageInfo } = usePackageInfo();
  const { data, isLoading } = useGetStores();

  const stores = data?.data?.data ?? Empty_Stores;
  const hasStores = stores?.length > 0;
  const maxStoreLimit = packageInfo?.data?.package_upgrade?.package?.max_store;
  const isStoreLimitExceeded = stores?.length >= maxStoreLimit;

  const isOpen = !isLoading && stores.length > 1 && !activeStore;

  // auto select single store
  useEffect(() => {
    if (!token) return;

    if (!isLoading && stores.length === 1 && !activeStore) {
      selectStore(stores[0]);
    }
  }, [token, isLoading, stores, activeStore, selectStore]);

  let content = null;

  if (isLoading) {
    content = (
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="bg-muted h-5 w-32 animate-pulse rounded" />
          <div className="bg-muted mt-2 h-3 w-48 animate-pulse rounded" />
        </AlertDialogHeader>
        <div className="divide-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="bg-muted size-8 animate-pulse rounded" />
              <div className="space-y-1">
                <div className="bg-muted h-3 w-24 animate-pulse rounded" />
                <div className="bg-muted h-2 w-32 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </AlertDialogContent>
    );
  }

  if (hasStores) {
    content = (
      <AlertDialogContent className="gap-4">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Store />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-sm font-medium">
            Select a store
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Switch between your existing stores or create a new one to get
            started.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* stores list */}
        <ul className="space-y-3">
          <li className="text-muted-foreground pb-1 text-xs font-medium">
            Your stores
          </li>

          {stores.map((store) => (
            <li
              key={store.id}
              className="hover:bg-muted/30 border-border rounded border px-4 py-3 transition-all duration-200 ease-linear"
            >
              <button
                onClick={() => selectStore(store)}
                className="flex w-full items-center gap-3"
              >
                {/* logo */}
                <div className="bg-background">
                  <img
                    src={`${BASE_URL}${store.logo}`}
                    alt={store.name}
                    className="size-8 rounded border object-contain p-1"
                  />
                </div>
                <div className="space-y-0.5 text-left">
                  <p className="text-xs font-medium">{store.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {store.domain ||
                      store.subdomain ||
                      "Using default store URL"}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {!isStoreLimitExceeded && (
          <AlertDialogFooter className="sm:flex-col">
            <div className="flex w-full items-center gap-x-3">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-xs">OR</span>
              <Separator className="flex-1" />
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-transparent"
            >
              Create a new store
              <ChevronRight />
            </Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    );
  }

  if (!hasStores) {
    content = (
      <AlertDialogContent className="gap-4 sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-sm font-semibold">
            <Store className="text-muted-foreground size-4" />
            Create your first store
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Set up your store to start managing products, orders and customers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button className="w-full" asChild>
            <Link to="/stores/create">Get started</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  }

  return <AlertDialog open={isOpen}>{content}</AlertDialog>;
}
