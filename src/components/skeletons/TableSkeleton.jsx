import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5, columns }) {
  return (
    <TableBody>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i}>
          {columns.map((col, j) => (
            <TableCell key={j} className={col.cellClassName}>
              <Skeleton className={col.skeletonClassName} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
