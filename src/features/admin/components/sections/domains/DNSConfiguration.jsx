import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Type", className: "w-24" },
  { label: "Name", className: "w-24" },
  { label: "Target", className: "w-72" },
  { label: "Proxy status", className: "w-15 text-center" },
];

const DNS_RECORDS = [
  { type: "CNAME", name: "@", value: "origin.bfinit.com" },
  { type: "CNAME", name: "www", value: "origin.bfinit.com" },
];

export default function DNSConfiguration() {
  return (
    <div className="border-border bg-card rounded-lg border p-6">
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">DNS records</h3>
        <p className="text-muted-foreground text-xs">
          These DNS records are one step in connecting your domain. Follow the
          setup guide to complete the process. It can take up to 72 hours.
        </p>
      </div>

      <Table className="mt-4 w-full table-fixed">
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
          {DNS_RECORDS.map((record) => (
            <TableRow key={record.name}>
              <TableCell className="border text-xs">{record.type}</TableCell>
              <TableCell className="border text-xs">{record.name}</TableCell>
              <TableCell className="border text-xs">{record.value}</TableCell>
              <TableCell className="border text-center">
                <Badge showDot variant="success">
                  Enabled
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="text-muted-foreground mt-4 text-xs">
        Need help setting up your domain?{" "}
        <Link
          to="/help/domain-setup"
          className="text-primary underline underline-offset-2"
        >
          View the setup guide
        </Link>
      </p>
    </div>
  );
}
