import { Link } from "react-router";
import { Store, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EmptyState({
  icon: Icon = Store,
  title,
  description,
  actionText = "Create Store",
  actionPath,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        "bg-card flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed py-8 text-center",
        "min-h-[calc(100dvh-95px)]",
        className,
      )}
    >
      <div className="bg-muted rounded-full p-4">
        <Icon className="text-muted-foreground h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-sm text-xs">{description}</p>
      </div>

      {actionText && actionPath && (
        <Button asChild size="sm">
          <Link to={actionPath}>
            <Plus className="size-3.5" />
            {actionText}
          </Link>
        </Button>
      )}

      {actionText && onAction && (
        <Button onClick={onAction} size="sm" variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
}
