import { Progress } from "@/components/ui/progress";
import { getOrderStatus } from "@/features/admin/utils/getOrderStatus";

export default function OrderStatus() {
  const status = getOrderStatus();

  return (
    <div className="bg-card col-span-full rounded-lg border px-4 lg:col-span-4">
      <div className="py-6">
        <p>Order Status</p>
        <p>32 orders this month</p>
      </div>

      <div className="space-y-2">
        {status?.map((stat, i) => (
          <div key={i}>
            <p className="text-muted-foreground text-xs">{stat.title}</p>
            <Progress value={stat.count} />
          </div>
        ))}
      </div>
    </div>
  );
}
