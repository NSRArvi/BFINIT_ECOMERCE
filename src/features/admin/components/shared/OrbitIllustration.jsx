import {
  Store,
  Package,
  Palette,
  Globe,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ORBIT = [Package, Palette, ShoppingCart, BookOpen, Globe];
const STEP = 360 / ORBIT.length;

export default function OrbitIllustration({ animated = false, className }) {
  return (
    <div className={cn("relative size-48", className)}>
      {/* Static rings */}
      <div className="border-border/60 absolute inset-0 rounded-full border" />
      <div className="border-border/80 absolute inset-6 rounded-full border" />
      <div className="bg-muted/40 absolute inset-12 rounded-full border" />

      {/* Orbit: rotates as a whole */}
      <div
        className={cn(
          "absolute inset-0",
          animated &&
            "motion-safe:animate-[spin_12s_linear_infinite] motion-reduce:animate-pulse",
        )}
      >
        {ORBIT.map((Icon, i) => {
          const angle = i * STEP;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              {/* sits on the outer ring, top center */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* cancel the static angle */}
                <span
                  className="block"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  {/* cancel the spin so icons stay upright */}
                  <span
                    className={cn(
                      "bg-card text-muted-foreground flex size-8 items-center justify-center rounded-lg border",
                      animated &&
                        "motion-safe:animate-[spin_12s_linear_infinite_reverse]",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Center */}
      <div
        className={cn(
          "bg-card absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border",
          animated && "animate-pulse",
        )}
      >
        <Store className="text-primary size-5" />
      </div>
    </div>
  );
}
