import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 border-transparent bg-destructive/5 text-destructive border-destructive/5 [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1  [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "gap-1 rounded-md border px-2 py-0.5 text-xs font-medium border-success/5 bg-success/5 text-success dark:border-success/30 dark:bg-success/20",
        warning:
          "gap-1 rounded-md border px-2 py-0.5 text-xs font-medium border-warning/5 bg-warning/5 text-warning dark:border-warning/30 dark:bg-warning/20",
        info: "gap-1 rounded-md border px-2 py-0.5 text-xs font-medium border-info/5 bg-info/5 text-info dark:border-info/30 dark:bg-info/20",
        neutral:
          "rounded-md gap-1 border border-border/20 bg-muted/30 px-2 py-0.5 text-xs font-medium text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  showDot = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            variant === "success" && "bg-success",
            variant === "neutral" && "bg-muted-foreground",
            variant === "info" && "bg-info",
            variant === "warning" && "bg-warning",
          )}
          aria-hidden="true"
        />
      )}
      {props.children}
    </Comp>
  );
}

export { Badge, badgeVariants };
