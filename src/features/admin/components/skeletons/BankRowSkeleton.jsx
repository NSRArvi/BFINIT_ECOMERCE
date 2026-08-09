import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function BankRowSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="h-[53px]">
          <TableCell className="border text-xs">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="border text-xs">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="border text-xs">
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell className="border text-xs">
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="w-20 border text-center text-xs">
            <Skeleton className="mx-auto h-4 w-8" />
          </TableCell>
          <TableCell className="w-18 border text-center">
            <Skeleton className="mx-auto h-4 w-4" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
