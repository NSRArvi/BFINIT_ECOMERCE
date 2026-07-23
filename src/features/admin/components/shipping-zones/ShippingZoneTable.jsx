import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import ShippingZoneRow from "./ShippingZoneRow";
import { cn } from "@/lib/utils";

const TABLE_HEADERS = [
  { label: "Zone Name", className: "text-left" },
  { label: "Country", className: "text-left" },
  { label: "Zone Type", className: "text-left" },
  { label: "Rates", className: "text-right" },
  { label: "Priority", className: "text-right" },
  { label: "Default", className: "text-center" },
  { label: "Status", className: "text-center" },
  { label: "Actions", className: "text-right" },
];

export default function ShippingZoneTable({ shippingZones = [], isLoading }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-card hover:bg-transparent">
          {TABLE_HEADERS.map(({ label, className }) => (
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
        <TableSkeleton
          rows={5}
          columns={[
            { cellClassName: "border text-xs", skeletonClassName: "h-3 w-32" },
            { cellClassName: "border text-xs", skeletonClassName: "h-3 w-24" },
            { cellClassName: "border text-xs", skeletonClassName: "h-3 w-16" },
            {
              cellClassName: "border w-20 text-right",
              skeletonClassName: "h-3 w-8 ml-auto",
            },
            {
              cellClassName: "border w-20 text-right",
              skeletonClassName: "h-3 w-8 ml-auto",
            },
            {
              cellClassName: "border w-28 text-center",
              skeletonClassName: "h-5 w-16 rounded-full mx-auto",
            },
            {
              cellClassName: "border w-24 text-center",
              skeletonClassName: "w-7 h-4 rounded-full mx-auto",
            },
            {
              cellClassName: "border w-18 text-right",
              skeletonClassName: "size-7 rounded mx-auto",
            },
          ]}
        />
      ) : (
        <TableBody>
          {shippingZones.map((zone) => (
            <ShippingZoneRow key={zone.id} zone={zone} />
          ))}
        </TableBody>
      )}
    </Table>
  );
}
