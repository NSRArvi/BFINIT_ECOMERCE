import { Link } from "react-router";
import {
  Plus,
  Store,
  Package,
  Palette,
  Globe,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const orbit = [
  { icon: Package, pos: "top-3 left-6" },
  { icon: Palette, pos: "top-1.5 right-8" },
  { icon: Globe, pos: "top-1/2 -left-2 -translate-y-1/2" },
  { icon: ShoppingCart, pos: "top-1/2 -right-2 -translate-y-1/2" },
  { icon: BookOpen, pos: "bottom-3 left-9" },
];

export default function NoStoreEmptyState() {
  return (
    <section className="flex min-h-[calc(100dvh-95px)] items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-5 size-48">
          <div className="border-border/60 absolute inset-0 rounded-full border" />
          <div className="border-border/80 absolute inset-6 rounded-full border" />
          <div className="bg-muted/40 absolute inset-12 rounded-full border" />

          {orbit.map(({ icon: Icon, pos }, i) => (
            <span
              key={i}
              className={`absolute ${pos} bg-card text-muted-foreground flex size-8 items-center justify-center rounded-lg border`}
            >
              <Icon className="size-4" />
            </span>
          ))}

          <div className="bg-card absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border">
            <Store className="text-primary size-5" />
          </div>
        </div>

        <h1 className="text-sm font-semibold">No store yet</h1>
        <p className="text-muted-foreground mt-1.5 max-w-sm text-xs leading-relaxed">
          You haven't created a store. Create one to start adding products,
          themes and taking orders.
        </p>

        <div className="mt-5 flex items-center gap-2">
          <Button size="sm" asChild>
            <Link to="/stores/create">
              <Plus />
              Create store
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link to="/help/domain-setup">Learn more</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
