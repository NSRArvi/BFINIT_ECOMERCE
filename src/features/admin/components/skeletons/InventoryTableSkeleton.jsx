import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function InventoryTableSkeleton() {
  return (
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="border">
            <div className="flex items-start gap-2">
              <Skeleton className="aspect-square size-8 shrink-0 rounded" />
              <Skeleton className="mt-1 h-3 w-24" />
            </div>
          </TableCell>

          <TableCell className="border">
            <Skeleton className="h-3 w-16" />
          </TableCell>

          <TableCell className="border text-right">
            <Skeleton className="ml-auto h-3 w-8" />
          </TableCell>

          <TableCell className="border">
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>

          <TableCell className="w-18 border text-center">
            <Skeleton className="mx-auto size-7 rounded" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
