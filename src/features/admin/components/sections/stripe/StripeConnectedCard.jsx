import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function StripeConnectedCard({ isEnabled }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const { mutate: patch, isPending } = usePatchMutation({
    endpoint: `/api/v1/stores/${activeStore?.id}/connect/activateinactive`,
    isTokenRequired: true,
  });

  const handleToggle = () => {
    patch(null, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        toast.success(data?.message);
        queryClient.invalidateQueries(["stripe", activeStore?.id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

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
          onCheckedChange={handleToggle}
          disabled={isPending}
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
