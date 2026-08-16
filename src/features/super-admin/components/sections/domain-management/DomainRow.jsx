import { useState } from "react";
import {
  BadgeAlert,
  BadgeCheck,
  BadgeMinus,
  BadgeX,
  EllipsisVertical,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { formatDate } from "@/utils/formatDate";
import { useQueryClient } from "@tanstack/react-query";

const domainStatusConfig = {
  pending: { variant: "warning", icon: BadgeAlert },
  verified: { variant: "success", icon: BadgeCheck },
  failed: { variant: "destructive", icon: BadgeX },
  disabled: { variant: "neutral", icon: BadgeMinus },
};

const statusChangeHints = {
  pending: null,
  verified: "The domain will be treated as live immediately.",
  failed:
    "The store owner will need to check their DNS records and resubmit the domain.",
  disabled:
    "The domain will be taken offline and the store will use its default subdomain.",
};

export default function DomainRow({ domain }) {
  const queryClient = useQueryClient();

  const {
    domain: domain_name,
    store_name,
    store_owner_email,
    status,
    created_at,
    id,
  } = domain || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const { variant, icon: StatusIcon } = domainStatusConfig[status];

  const { mutate, isPending } = usePatchMutation({
    endpoint: `/api/v1/platform/domains/${id}/verify`,
    isTokenRequired: true,
  });

  const handleConfirm = () => {
    mutate(
      {
        status: selectedStatus,
      },
      {
        onSuccess: (data) => {
          if (!data?.success) return toast.error(data?.message);
          queryClient.invalidateQueries(["domains"]);
          setIsStatusDialogOpen(false);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const handleOpenChange = (open) => {
    setIsStatusDialogOpen(open);
    if (open) setSelectedStatus(status);
  };

  return (
    <>
      <TableRow>
        <TableCell className="border text-xs">{domain_name}</TableCell>
        <TableCell className="border text-xs">{store_name}</TableCell>
        <TableCell className="border text-xs tracking-wider tabular-nums">
          {store_owner_email}
        </TableCell>
        <TableCell className="w-28 border text-center text-xs capitalize">
          <Badge variant={variant}>
            <StatusIcon />
            {status}
          </Badge>
        </TableCell>
        <TableCell className="w-32 border text-center text-xs">
          {formatDate(created_at)}
        </TableCell>
        <TableCell className="w-18 border text-center">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsStatusDialogOpen(true)}>
                <Pencil className="size-3.5" />
                Update Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <Dialog open={isStatusDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update domain status</DialogTitle>
            <DialogDescription className="text-xs">
              Change the status of{" "}
              <span className="text-foreground font-medium">{domain_name}</span>
            </DialogDescription>
          </DialogHeader>

          <div>
            <label className="text-xs font-medium">Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="mt-1.5 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {statusChangeHints[selectedStatus] && (
            <p className="text-muted-foreground mt-3 text-xs">
              {statusChangeHints[selectedStatus]}
            </p>
          )}

          <DialogFooter>
            <Button
              disabled={isPending}
              onClick={() => setIsStatusDialogOpen(false)}
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending || selectedStatus === status}
              onClick={handleConfirm}
              size="sm"
              className="min-w-[106px]"
            >
              {isPending ? (
                <>
                  <Spinner /> Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
