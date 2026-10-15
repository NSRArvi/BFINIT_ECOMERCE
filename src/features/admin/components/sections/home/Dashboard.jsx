import { Link } from "react-router";
import { ExternalLink, Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentOrders from "./dashboard/RecentOrders";
import StatCards from "./dashboard/StatCards";
import SetupGuide from "./onboard/SetupGuide";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function Dashboard({ setupProgress, steps }) {
  const { user } = useAuth();
  const { activeStore } = useSelectedStore();

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
            <Store className="size-4" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-base font-semibold">
              Hi {user?.data?.user?.name}
            </h1>
            <p className="text-muted-foreground max-w-md text-xs">
              {setupProgress?.hasStore
                ? "Here's how your store is doing"
                : "Finish these steps to start selling"}
            </p>
          </div>
        </div>

        {setupProgress?.hasStore && (
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="h-8 text-xs">
              <Link to={`/stores/${activeStore?.id}`} target="_blank">
                <ExternalLink className="size-3" />
                View Store
              </Link>
            </Button>
          </div>
        )}
      </header>

      <SetupGuide setupProgress={setupProgress} steps={steps} />

      <StatCards />

      <div className="grid grid-cols-12 gap-6">
        <RecentOrders />
        {/* <OrderStatus /> */}
      </div>
    </section>
  );
}
