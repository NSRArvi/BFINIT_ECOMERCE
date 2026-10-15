import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepIcon from "./StepIcon";
import { cn } from "@/lib/utils";

export default function StepRow({ step, isOpen }) {
  return (
    <li className={cn("rounded-lg px-2 py-2.5", isOpen && "bg-card border")}>
      <div className="flex w-full items-center gap-2">
        <StepIcon done={step.done} isOpen={isOpen} />

        <p
          className={cn(
            "flex-1 text-xs",
            isOpen ? "font-medium" : "text-muted-foreground",
          )}
        >
          {step.title}{" "}
          {step.optional && !step.done && !isOpen && <span>(Optional)</span>}
        </p>

        {!step.done && (
          <span className="text-muted-foreground text-xs tabular-nums">
            {step.time}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="mt-0.5 flex flex-col gap-3 pl-5">
          <p className="text-muted-foreground max-w-md text-xs leading-relaxed">
            {step.description}
          </p>

          <Button asChild size="sm" className="h-7 w-fit">
            <Link to={step.cta.to}>
              {step.cta.label}
              <ChevronRight className="3" />
            </Link>
          </Button>
        </div>
      )}
    </li>
  );
}
