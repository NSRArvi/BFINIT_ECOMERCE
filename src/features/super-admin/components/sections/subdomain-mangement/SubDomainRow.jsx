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
import useSearchParamState from "@/hooks/useSearchParamState";

const domainStatusConfig = {
  pending: { variant: "warning", icon: BadgeAlert },
  verified: { variant: "success", icon: BadgeCheck },
  failed: { variant: "destructive", icon: BadgeX },
  disabled: { variant: "neutral", icon: BadgeMinus },
};

const statusChangeHints = {
  pending: null,
  verified:
    "The subdomain will be marked as active and available for the store.",
  failed:
    "The subdomain will be marked as unavailable until the setup issue is resolved.",
  disabled: "The subdomain will be disabled and unavailable for the store.",
};

export default function SubDomainRow({ subdomain }) {
  const queryClient = useQueryClient();
  const [search] = useSearchParamState("search");
  const [page] = useSearchParamState("page", "1");

  const {
    public_subdomain,
    name,
    contact_email,
    subdomain_status,
    created_at,
    id,
  } = subdomain || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(subdomain_status);

  const { variant, icon: StatusIcon } = domainStatusConfig[subdomain_status];

  const { mutate, isPending } = usePatchMutation({
    endpoint: `/api/v1/platform/domains/${id}/subdomain-verification`,
    isTokenRequired: true,
  });

  const handleConfirm = () => {
    mutate(
      {
        subdomain_status: selectedStatus,
      },
      {
        onSuccess: (data) => {
          if (!data?.success) return toast.error(data?.message);
          queryClient.invalidateQueries(["subdomains", page, search]);
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
    if (open) setSelectedStatus(subdomain_status);
  };

  return (
    <>
      <TableRow>
        <TableCell className="border text-xs">{public_subdomain}</TableCell>
        <TableCell className="border text-xs">{name}</TableCell>
        <TableCell className="border text-xs tracking-wider tabular-nums">
          {contact_email}
        </TableCell>
        <TableCell className="w-28 border text-center text-xs capitalize">
          <Badge variant={variant}>
            <StatusIcon />
            {subdomain_status}
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
            <DialogTitle>Update subdomain status</DialogTitle>
            <DialogDescription className="text-xs">
              Change the status of{" "}
              <span className="text-foreground font-medium">
                {public_subdomain}
              </span>
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
              disabled={isPending || selectedStatus === subdomain_status}
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
