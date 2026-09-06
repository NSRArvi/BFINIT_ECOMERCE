import { Link } from "react-router";
import { ArrowLeftRight, ExternalLink, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import useSelectedStore from "@/hooks/useSelectedStore";
import { cn } from "@/lib/utils";
import { getImgUrl } from "@/utils/getImgUrl";

export default function StoreCard({ store = {} }) {
  const { activeStore, selectStore } = useSelectedStore();
  const { name, domain, subdomain, logo, id, is_active } = store;

  const isCurrentStore = activeStore?.id === id;

  return (
    <Card
      className={cn(
        "relative w-full max-w-sm p-4",
        isCurrentStore && "bg-muted border-dashed",
      )}
    >
      {isCurrentStore && (
        <Badge
          variant="outline"
          className="bg-card absolute -top-2.5 left-3 z-10 border-dashed text-xs"
        >
          Current
        </Badge>
      )}

      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-0.5">
            <img
              src={getImgUrl(logo)}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm leading-tight font-medium">{name}</p>
            <p className="text-muted-foreground text-xs">
              {store.domain || store.subdomain || "Using default store URL"}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <Button variant="outline" size="icon-sm">
            <Link to={`/stores/${id}`} target="_blank">
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>
          <Button aschild size="icon-sm" variant="outline">
            <Link to={`/stores/edit/${id}`}>
              <Pencil className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="mb-3 flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Active</span>
        <Switch checked={is_active} />
      </div>

      <Button
        onClick={() => selectStore(store)}
        disabled={isCurrentStore}
        size="sm"
        variant="outline"
      >
        <ArrowLeftRight className="size-3.5" />
        Switch
      </Button>
    </Card>
  );
}
