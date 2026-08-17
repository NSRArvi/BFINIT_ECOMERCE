import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubDomainRow from "./SubDomainRow";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Subdomain", className: "text-left" },
  { label: "Store Name", className: "text-left" },
  { label: "Owner Email", className: "text-left" },
  { label: "Status", className: "text-center" },
  { label: "Requested On", className: "text-center" },
  { label: "Action", className: "text-center" },
];

export default function SubDomainTable({ domains = [], isLoading = false }) {
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

      <TableBody>
        {isLoading ? (
          <SubDomainRow />
        ) : (
          domains?.map((subdomain) => (
            <SubDomainRow key={subdomain.id} subdomain={subdomain} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
