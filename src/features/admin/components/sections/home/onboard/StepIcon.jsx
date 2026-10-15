import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StepIcon({ done, isOpen }) {
  if (done) {
    return (
      <span className="bg-success text-success-foreground flex size-3 shrink-0 items-center justify-center rounded-full">
        <Check className="size-2.5" strokeWidth={4} />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "size-3 shrink-0 rounded-full border border-dashed",
        isOpen ? "border-primary" : "border-muted-foreground/40",
      )}
    />
  );
}
