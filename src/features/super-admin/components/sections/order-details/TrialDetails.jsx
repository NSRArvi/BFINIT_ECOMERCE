import { Gift, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDate } from "@/utils/formatDate";
import { getTrialInfo } from "@/features/super-admin/utils/trial";

export default function TrialDetails({ orderDetails }) {
  const { start, end, totalDays, expired } = getTrialInfo(orderDetails);

  const rows = [
    { label: "Started", value: formatDate(start) },
    { label: expired ? "Ended" : "Ends", value: formatDate(end) },
    { label: "Length", value: totalDays ? `${totalDays} days` : "—" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            <Gift
              className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]"
              aria-hidden="true"
            />
            Trial info
          </CardTitle>
          <Badge variant="neutral" className="text-xs font-normal">
            Free Trial
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">{label}</span>
              <span className="text-xs font-medium">{value}</span>
            </div>
          ))}
        </div>

        <Alert variant="info" className="[&>svg]:translate-y-0">
          <Info />
          <AlertDescription className="text-xs">
            No payment taken and no approval needed.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
