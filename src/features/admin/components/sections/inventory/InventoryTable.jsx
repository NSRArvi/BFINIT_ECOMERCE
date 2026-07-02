import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InventoryRow from "./InventoryRow";
import InventoryTableSkeleton from "../../skeletons/InventoryTableSkeleton";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Product", className: "text-left" },
  { label: "Category", className: "text-left" },
  { label: "Stock", className: "text-right" },
  { label: "Status", className: "text-left" },
  { label: "Action", className: "text-center" },
];

export default function InventoryTable({ isLoading, products = [] }) {
  return (
    <Table>
      <TableHeader>
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

      {isLoading ? (
        <InventoryTableSkeleton />
      ) : (
        <TableBody>
          {products.map((product) => (
            <InventoryRow key={product.id} product={product} />
          ))}
        </TableBody>
      )}
    </Table>
  );
}
