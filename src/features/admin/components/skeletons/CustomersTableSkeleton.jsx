import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns = [
  { headClass: "", headWidth: "w-16", cell: "customer" },
  { headClass: "", headWidth: "w-12", cell: "phone" },
  { headClass: "text-right", headWidth: "w-12", cell: "number" },
  { headClass: "text-right", headWidth: "w-16", cell: "number" },
  { headClass: "", headWidth: "w-12", cell: "status" },
  { headClass: "", headWidth: "w-12", cell: "date" },
];

const renderCell = (type) => {
  switch (type) {
    case "customer":
      return (
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-40" />
        </div>
      );
    case "phone":
      return <Skeleton className="h-3 w-28" />;
    case "number":
      return <Skeleton className="ml-auto h-3 w-10" />;
    case "status":
      return <Skeleton className="h-5 w-16 rounded-full" />;
    case "date":
      return <Skeleton className="h-3 w-20" />;
    default:
      return null;
  }
};

export default function CustomersTableSkeleton() {
  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="bg-muted hover:bg-muted">
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} className={`border ${col.headClass}`}>
                <Skeleton
                  className={`bg-card h-3 ${col.headWidth} ${
                    col.headClass === "text-right" ? "ml-auto" : ""
                  }`}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              {columns.map((col, i) => (
                <TableCell key={i} className="border">
                  {renderCell(col.cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
