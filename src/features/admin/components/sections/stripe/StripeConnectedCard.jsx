import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function StripeConnectedCard({
  isEnabled,
  onToggle,
  isToggling,
}) {
  return (
    <div className="bg-background rounded-lg border">
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Stripe</h2>

            <Badge
              variant={isEnabled ? "success" : "neutral"}
              className="font-normal"
            >
              {isEnabled ? "Active" : "Paused"}
            </Badge>
          </div>

          <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
            {isEnabled
              ? "Turn off to temporarily stop accepting Stripe payments without disconnecting your account."
              : "Stripe payments are paused. Customers can't pay with Stripe until you turn it back on."}
          </p>
        </div>

        <Switch
          checked={isEnabled}
          onCheckedChange={onToggle}
          disabled={isToggling}
        />
      </div>

      <div className="border-t" />

      <div className="text-muted-foreground flex items-center gap-1.5 px-5 py-3 text-xs">
        <ShieldCheck className="size-3.5" />
        Connected securely using Stripe's authorization flow.
      </div>
    </div>
  );
}
