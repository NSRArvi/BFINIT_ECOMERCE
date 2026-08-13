import { useState } from "react";
import { Link } from "react-router";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import useSelectedStore from "@/hooks/useSelectedStore";
import { Switch } from "@/components/ui/switch";
import useDeleteMutation from "@/hooks-v2/api/useDeleteMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return "";
  return "••••••••" + accountNumber.slice(-4);
};

export default function BankRow({ bank }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const {
    id,
    bank_name,
    account_name,
    account_number,
    iban,
    swift_code,
    is_active,
  } = bank;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: toggle, isPending: isTogglePending } = usePatchMutation({
    endpoint: `/api/v1/bankPayment/toggle-active-inactive/${activeStore?.id}/${id}`,
    isTokenRequired: true,
  });

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/api/v1/bankPayment/delete/${activeStore?.id}/${id}`,
    isTokenRequired: true,
  });

  const handleStatusToggle = () => {
    toggle(null, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        queryClient.invalidateQueries(["bankAccounts", activeStore?.id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleBankDelete = () => {
    mutate(null, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        close();
        toast.success(data?.message);
        queryClient.invalidateQueries(["bankAccounts", activeStore?.id]);
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to delete bank account");
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="border text-xs">{bank_name}</TableCell>
        <TableCell className="border text-xs">{account_name}</TableCell>
        <TableCell className="border text-xs tracking-wider tabular-nums">
          {maskAccountNumber(account_number || iban)}
        </TableCell>
        <TableCell className="border text-xs">
          {swift_code || <span className="text-muted-foreground">Not set</span>}
        </TableCell>
        <TableCell className="w-20 border text-center text-xs">
          <Switch
            disabled={isTogglePending || isPending}
            checked={is_active}
            onCheckedChange={handleStatusToggle}
          />
        </TableCell>

        <TableCell className="w-18 border text-center">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  to={`/payments/bank/edit/${id}`}
                  className="cursor-pointer text-xs font-medium"
                >
                  <Pencil />
                  Edit
                </Link>
              </DropdownMenuItem>

              {/* delete menu item */}
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer text-xs font-medium"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteDialogOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <Trash2 className="text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Delete Modal */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete bank account?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{bank_name}&quot;</span>?
            Customers will no longer be able to use this bank account for bank
            transfer payments. This action cannot be undone.
          </>
        }
        onConfirm={handleBankDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        loadingText="Deleting"
        variant="destructive"
      />
    </>
  );
}
