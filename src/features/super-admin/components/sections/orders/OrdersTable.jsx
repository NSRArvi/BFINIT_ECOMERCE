import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderRow from "./OrderRow";

const tableHeader = [
  "Invoice",
  "Customer",
  "Package",
  "Total",
  "Payment Method",
  "Status",
  "Actions",
];

export default function OrdersTable({ orders = [] }) {
  return (
    <Table>
      <TableHeader className="bg-card hover:bg-transparent">
        <TableRow>
          {tableHeader.map((item, index) => (
            <TableHead key={index} className="border text-xs font-semibold">
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders?.map((order) => (
          <OrderRow key={order?.packageInvoice?.invoice_number} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}
