import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderRow from "./OrderRow";

const ORDER_COLUMNS = [
  { key: "order_id", label: "Order ID" },
  { key: "customer", label: "Customer" },
  { key: "date", label: "Date & Time" },
  { key: "items", label: "Items" },
  { key: "total", label: "Total" },
  { key: "payment_method", label: "Payment Method" },
  { key: "payment_status", label: "Payment Status" },
  { key: "order_status", label: "Order Status" },
  { key: "delivery_status", label: "Delivery Status" },
  { key: "actions", label: "Actions" },
];

export default function OrdersTable({ orders }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-card hover:bg-transparent">
          {ORDER_COLUMNS.map((col) => (
            <TableHead
              key={col.key}
              className="text-muted-foreground border text-xs font-medium"
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <OrderRow order={order} />
        ))}
      </TableBody>
    </Table>
  );
}
