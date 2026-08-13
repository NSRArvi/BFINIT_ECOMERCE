import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BankRow from "./BankRow";
import { BankRowSkeleton } from "../../skeletons/BankRowSkeleton";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Bank", className: "text-left" },
  { label: "Account Holder", className: "text-left" },
  { label: "IBAN / Account No.", className: "text-left" },
  { label: "SWIFT / BIC", className: "text-left" },
  { label: "Active", className: "text-center" },
  { label: "Action", className: "text-center" },
];

export default function BankTable({ isLoading = false, accounts = [] }) {
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
          <BankRowSkeleton />
        ) : (
          accounts?.map((bank) => <BankRow key={bank.id} bank={bank} />)
        )}
      </TableBody>
    </Table>
  );
}
