import { ShieldCheck, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function ApprovalCard({ orderDetails = {} }) {
  const { approved_by, invoice_number } = orderDetails;
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePatchMutation({
    endpoint: `/api/v1/package-order/approve-package-invoice/${invoice_number}`,
    isTokenRequired: true,
  });

  const handlePaymentApproval = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          `/api/v1/package-order/order-info/${invoice_number}`,
          "order-details",
          invoice_number,
        ]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const icon = isPending ? <Spinner /> : <Check size={14} />;
  const label = isPending ? "Approving..." : "Approve payment";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          <ShieldCheck
            className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]"
            aria-hidden="true"
          />
          Approval
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
          Review the payment slip and bank details before approving. This action
          activates the customer's subscription.
        </p>

        {approved_by ? (
          <p className="text-success text-xs">Payment verified by admin</p>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePaymentApproval}
              disabled={approved_by || isPending}
              size="sm"
            >
              {icon} {label}
            </Button>

            <Button
              disabled={approved_by || isPending}
              variant="destructive"
              size="sm"
            >
              <X size={14} />
              Reject payment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
