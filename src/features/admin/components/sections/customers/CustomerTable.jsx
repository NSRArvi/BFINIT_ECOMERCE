import CustomerRow from "./CustomerRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Customer", className: "text-left" },
  { label: "Phone", className: "text-left" },
  { label: "Orders", className: "text-right" },
  { label: "Total Spent", className: "text-right" },
  { label: "Status", className: "text-left" },
  { label: "Joined", className: "text-left" },
];

export default function CustomerTable({ customers = [] }) {
  return (
    <Table>
      <TableHeader className="bg-card hover:bg-transparent">
        <TableRow className="bg-card hover:bg-transparent">
          {tableHeaders.map(({ label, className }) => (
            <TableHead
              key={label}
              className={cn(
                "text-muted-foreground border text-xs font-medium",
                className,
              )}
            >
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers?.map((customer) => (
          <CustomerRow key={customer?.id} customer={customer} />
        ))}
      </TableBody>
    </Table>
  );
}
