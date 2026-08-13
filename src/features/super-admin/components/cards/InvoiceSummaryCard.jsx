import { ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDecimal } from "@/utils/format/formatDecimal";

export default function InvoiceSummaryCard({ orderDetails = {} }) {
  const { payment_amount, invoice_number, package_upgrade } = orderDetails;

  const duration = package_upgrade?.subscriptionPeriod?.duration;
  const discount = Number(package_upgrade?.discount_amount);
  const discountType = package_upgrade?.discount_type;
  const hasDiscount = discount > 0;

  return (
    <Card className="w-full">
      <CardHeader className="text-muted-foreground flex gap-2">
        <ReceiptText size={16} />

        <div className="space-y-0.5 text-xs">
          <CardTitle className="font-medium tracking-wider uppercase">
            Invoice summary
          </CardTitle>
          <p>#{invoice_number}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Big total */}
        <div>
          <p className="font-semibold">€{formatDecimal(payment_amount)}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {duration >= 12 ? "1 year" : `${duration} month`}
            {hasDiscount && "· discount"}
          </p>
        </div>

        <Separator />

        {/* Line items */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Subtotal</span>
            <span className="text-xs font-medium">
              €{formatDecimal(payment_amount)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              Discount
              {discountType && (
                <span className="text-muted-foreground ml-1">
                  ({discountType})
                </span>
              )}
            </span>
            <span
              className={`text-xs font-medium ${
                hasDiscount ? "text-success" : "text-muted-foreground"
              }`}
            >
              €{hasDiscount ? formatDecimal(payment_amount) : "0.00"}
            </span>
          </div>
        </div>

        <Separator />

        {/* Total row */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-semibold">
            €{formatDecimal(payment_amount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
