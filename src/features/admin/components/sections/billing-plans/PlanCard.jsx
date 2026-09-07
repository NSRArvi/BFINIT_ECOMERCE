import { useState } from "react";
import { Link } from "react-router";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatDecimal } from "@/utils/format/formatDecimal";

const VISIBLE_COUNT = 5;

export default function PlanCard({
  pack,
  billingCycle,
  currentPackage,
  isFetching,
}) {
  const {
    id,
    package_name,
    package_type_label,
    badge,
    short_description,
    description = [],
    max_store,
    product_limit,
    max_storage,
    pricing,
  } = pack;

  const [expanded, setExpanded] = useState(false);

  const isCurrent = id === currentPackage?.package_upgrade?.package?.id;
  const isUpgrade =
    max_store > currentPackage?.package_upgrade?.package?.max_storage ||
    product_limit > currentPackage?.package_upgrade?.package?.product_limit ||
    max_storage > currentPackage?.package_upgrade?.package?.max_storage;

  const price = pricing?.total_base_price;

  const visibleFeatures = expanded
    ? description
    : description.slice(0, VISIBLE_COUNT);
  const hasMore = description.length > VISIBLE_COUNT;

  return (
    <div
      className={cn(
        "relative flex h-fit flex-col overflow-hidden rounded-md",
        expanded && "h-full",
        isFetching && "pointer-events-none animate-pulse",
      )}
    >
      <div
        className={`flex h-9 items-center justify-center text-sm ${badge ? "bg-foreground text-primary-foreground" : "bg-transparent"}`}
      >
        {badge && <p>{badge}</p>}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col rounded-md border p-4",
          badge && "rounded-t-none",
        )}
      >
        <div className="flex-1">
          {package_type_label && (
            <p className="text-muted-foreground mb-0.5 text-xs">
              {package_type_label}
            </p>
          )}
          <span className="text-sm font-medium">{package_name}</span>

          <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
            {short_description}
          </p>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-xl font-semibold">
              €{formatDecimal(price)}
            </span>
            <span className="text-muted-foreground text-xs">
              /{billingCycle === "yearly" ? "year" : "month"}
            </span>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-muted-foreground text-xs">Max stores</p>
              <p className="mt-0.5 text-sm font-medium">{max_store}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Products</p>
              <p className="mt-0.5 text-sm font-medium">
                {product_limit === null ? "Unlimited" : product_limit}
              </p>
            </div>
          </div>

          {description.length > 0 && (
            <>
              <Separator className="my-4" />
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                What&apos;s included
              </p>
              <ul className="space-y-1.5">
                {visibleFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs">
                    <Check className="text-muted-foreground mt-0.5 size-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="text-muted-foreground hover:text-foreground mt-2 flex items-center gap-1 text-xs"
                >
                  {expanded ? "Show less" : "View full plan"}
                  <ChevronDown
                    className={cn(
                      "size-3 transition-transform",
                      expanded && "rotate-180",
                    )}
                  />
                </button>
              )}
            </>
          )}
        </div>

        <Separator className="my-4" />

        {isCurrent ? (
          <Button disabled variant="outline" size="sm" className="rounded">
            <span className="flex items-center gap-1.5">Current plan</span>
          </Button>
        ) : (
          <Button asChild size="sm" className="rounded">
            <Link
              to={`https://bfinit.com/checkout/packages/${id}/${billingCycle === "yearly" ? 12 : 1}`}
            >
              {isUpgrade ? "Upgrade" : "Downgrade"}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
