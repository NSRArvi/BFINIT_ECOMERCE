import { Link } from "react-router";
import toast from "react-hot-toast";
import { Eye, Copy, CreditCard, Banknote } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import useSelectedStore from "@/hooks/useSelectedStore";
import { useState } from "react";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

// TODO: confirm real numeric status enum with backend
const ORDER_STATUSES = [
  { value: 0, label: "Pending", variant: "secondary" },
  { value: 1, label: "Processing", variant: "default" },
  { value: 2, label: "Delivered", variant: "default" },
  { value: 3, label: "Cancelled", variant: "destructive" },
];

function getStatusVariant(status) {
  return ORDER_STATUSES.find((s) => s.value === status)?.variant ?? "secondary";
}

function getStatusLabel(status) {
  return ORDER_STATUSES.find((s) => s.value === status)?.label ?? status;
}

function formatDateTime(isoString) {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

function getPaymentMethodIcon(type) {
  return type === "offline" ? Banknote : CreditCard;
}

export default function OrderRow({ order }) {
  const {
    id,
    order_number,
    status: initialStatus,
    created_at,
    total_amount,
    currency,
    payment_type,
    phone,
    shipping_address,
    ecomOrderItems,
  } = order;

  const { selectedStore } = useSelectedStore();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(initialStatus);

  const { date: createdDate, time: createdTime } = formatDateTime(created_at);

  const totalItems =
    ecomOrderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const PaymentIcon = getPaymentMethodIcon(payment_type);

  // single status endpoint - no separate order/delivery/payment status yet
  const { mutate: statusMutate, isPending: isUpdatingStatus } =
    usePatchMutation({
      endpoint: `/api/v1/order/status/${id}`,
      token: true,
      clientId: true,
    });

  const updateStatus = (value) => {
    setStatus(value);
    statusMutate(
      { status: value },
      {
        onSuccess: () => {
          toast.success("Order status updated!");
          queryClient.invalidateQueries(["orders", selectedStore?.storeId]);
        },
        onError: () => {
          toast.error("Something went wrong!");
          setStatus(initialStatus);
        },
      },
    );
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(order_number);
    toast.success("Order ID copied!");
  };

  return (
    <TableRow>
      <TableCell className="border text-xs">
        <div className="flex items-center gap-1.5">
          <Button
            onClick={copyOrderId}
            size="icon"
            variant="ghost"
            className="size-3.5 shrink-0"
          >
            <Copy className="size-3.5" />
          </Button>
          <span className="max-w-xs truncate">{order_number}</span>
        </div>
      </TableCell>

      <TableCell className="max-w-xs border text-xs">
        <div className="flex flex-col gap-1">
          <span>{phone}</span>
          <span className="text-muted-foreground truncate">
            {shipping_address}
          </span>
        </div>
      </TableCell>

      <TableCell className="border text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="">{createdDate}</span>
          <span className="text-muted-foreground">{createdTime}</span>
        </div>
      </TableCell>

      <TableCell className="border text-xs">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </TableCell>

      <TableCell className="border text-xs">
        {Number(total_amount).toLocaleString()} {currency}
      </TableCell>

      <TableCell className="border text-xs">
        <div className="flex items-center gap-1.5">
          <PaymentIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
          <span className="capitalize">{payment_type}</span>
        </div>
      </TableCell>

      {/* stub - no payment_status field in response, reusing status */}
      <TableCell className="border text-xs">
        <Badge
          variant={getStatusVariant(status)}
          className="text-xs font-normal"
        >
          {getStatusLabel(status)}
        </Badge>
      </TableCell>

      <TableCell className="border text-xs">
        <Select
          value={status}
          onValueChange={updateStatus}
          disabled={isUpdatingStatus}
        >
          <SelectTrigger className="w-33 border text-xs">
            <SelectValue>
              <Badge
                variant={getStatusVariant(status)}
                className="text-xs font-normal"
              >
                {getStatusLabel(status)}
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value} className="text-xs">
                <Badge variant={s.variant} className="text-xs font-normal">
                  {s.label}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* stub - no delivery_status field in response, reusing status */}
      <TableCell className="border text-xs">
        <Badge
          variant={getStatusVariant(status)}
          className="text-xs font-normal"
        >
          {getStatusLabel(status)}
        </Badge>
      </TableCell>

      <TableCell className="border text-xs">
        <Button variant="ghost" size="sm" asChild className="text-xs">
          <Link to={`/orders/${id}`}>
            <Eye />
            View
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
