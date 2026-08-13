import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import BankAccountRow from "./BankAccountRow";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Bank", className: "text-left" },
  { label: "Account Holder", className: "text-left" },
  { label: "IBAN / Account No.", className: "text-left" },
  { label: "SWIFT / BIC", className: "text-left" },
  { label: "Active", className: "text-center" },
  { label: "Action", className: "text-center" },
];

export default function BankAccountsTable({ data }) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="bg-card">
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
            {data?.map((account) => (
              <BankAccountRow key={account?.id} account={account} />
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
