import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowRight, CalendarX, Hourglass } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useSelectedStore from "@/hooks/useSelectedStore";
import { cn } from "@/lib/utils";

const COPY = {
  trial: {
    icon: Hourglass,
    iconClassName: "",
    badgePrefix: "Trial ended",
    title: "Your free trial has ended",
    description:
      "Choose a plan to bring your store back online. Your products, orders and customers are safe and waiting for you.",
    cta: { label: "Choose a plan", to: "/account/billing/plans" },
    restoreVerb: "Pick a plan",
  },

  expired: {
    icon: CalendarX,
    iconClassName: "text-destructive",
    badgePrefix: "Expired",
    title: "Your subscription has expired",
    description:
      "Renew to restore your store and dashboard access. Your products, orders and customers are safe and waiting for you.",
    cta: { label: "Renew subscription", to: "/account/billing/plans" },
    restoreVerb: "Renew",
  },
};

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SubscriptionExpired({ reason = "expired", expiredAt }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearStore } = useSelectedStore();

  const { icon: Icon, ...copy } = COPY[reason] ?? COPY.expired;

  const infoItems = [
    {
      title: "Store paused",
      description: `Your storefront is offline and checkout is disabled until you ${copy.restoreVerb.toLowerCase()}.`,
    },
    {
      title: "Your data is safe",
      description:
        "Products, orders, customers and themes stay exactly as you left them.",
    },
    {
      title: "Restored right away",
      description: `${copy.restoreVerb} and your store goes live again, nothing to set up twice.`,
    },
  ];

  const handleLogOut = () => {
    clearStore();
    queryClient.clear();
    localStorage.removeItem("authInfo");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 pt-4">
      {/* main card */}
      <section className="bg-card flex flex-col items-center rounded-lg border px-8 py-8 text-center">
        <div className="bg-muted flex size-9 items-center justify-center rounded-lg border">
          <Icon className={cn("size-4", copy.iconClassName)} />
        </div>

        <Badge variant="secondary" className="mt-3">
          {formatDate(expiredAt)
            ? `${copy.badgePrefix} on ${formatDate(expiredAt)}`
            : copy.badgePrefix}
        </Badge>

        <h1 className="mt-3 text-sm font-semibold">{copy.title}</h1>
        <p className="text-muted-foreground mt-1.5 max-w-sm text-xs leading-relaxed">
          {copy.description}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <Button size="sm" asChild>
            <Link to={copy.cta.to}>
              {copy.cta.label}
              <ArrowRight />
            </Link>
          </Button>

          <Button size="sm" variant="outline" asChild>
            <Link to="https://bfinit.com/contact" target="_blank">
              Contact support
            </Link>
          </Button>
        </div>

        <div className="mt-4 inline-flex items-center gap-1">
          <p className="text-muted-foreground text-xs">Wrong account?</p>
          <Button
            onClick={handleLogOut}
            size="sm"
            variant="link"
            className="p-0"
          >
            Log out
          </Button>
        </div>
      </section>

      {/* what happens next */}
      <div className="grid gap-4 sm:grid-cols-3">
        {infoItems.map(({ title, description }) => (
          <div key={title} className="bg-card rounded-lg border p-4">
            <p className="text-xs font-semibold">{title}</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
