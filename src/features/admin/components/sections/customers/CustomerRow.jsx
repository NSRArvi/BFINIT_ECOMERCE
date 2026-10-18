import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { formatPhone } from "@/utils/format/formatPhone";

export default function CustomerRow({ customer }) {
  const {
    name,
    email,
    country_code,
    phone,
    is_active,
    is_verified,
    created_at,
    stats,
  } = customer;

  return (
    <TableRow>
      <TableCell className="border">
        <div className="text-xs">
          <p className="max-w-xs truncate font-medium" title={name}>
            {name}
          </p>
          <p className="text-muted-foreground max-w-xs truncate" title={email}>
            {email}
          </p>
        </div>
      </TableCell>

      <TableCell className="border text-xs">
        {formatPhone(country_code, phone)}
      </TableCell>

      <TableCell className="border text-right text-xs">
        {stats.total_orders}
      </TableCell>

      <TableCell className="border text-right text-xs">
        {stats.total_spent}
      </TableCell>

      <TableCell className="border text-xs">
        <div className="flex flex-wrap items-center gap-1">
          {is_active ? (
            <Badge variant="success" className="font-normal">
              <div className="size-1.5 rounded-full bg-current" /> Active
            </Badge>
          ) : (
            <Badge variant="neutral" className="font-normal">
              <div className="size-1.5 rounded-full bg-current" /> Inactive
            </Badge>
          )}

          {!is_verified && (
            <Badge variant="warning" className="font-normal">
              Unverified
            </Badge>
          )}
        </div>
      </TableCell>

      <TableCell className="border text-xs">{formatDate(created_at)}</TableCell>
    </TableRow>
  );
}
