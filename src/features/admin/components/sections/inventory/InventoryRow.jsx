import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import useDeleteMutation from "@/hooks-v2/api/useDeleteMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import { getImgUrl } from "@/utils/getImgUrl";

export default function InventoryRow({ product }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const { id, image, name, category, stock, is_active } = product || {};

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteSelect = (e) => {
    e.preventDefault();
    setIsDeleteOpen(true);
    setIsDropdownOpen(false);
  };

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/api/v1/product/store/${activeStore?.id}/${id}`,
    isTokenRequired: true,
  });

  const handleDelete = () => {
    mutate(null, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        toast.success(data?.message);
        queryClient.invalidateQueries(["products", activeStore?.id]);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="border">
          <div className="flex items-start gap-2">
            <div className="aspect-square size-8 overflow-hidden rounded border">
              <img
                src={getImgUrl(image)}
                alt={name}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="mt-1 text-xs">
              <Link
                to="/products/inventory"
                title={name}
                className="max-w-xs truncate"
              >
                {name}
              </Link>
            </div>
          </div>
        </TableCell>

        <TableCell className="border text-xs">{category.name}</TableCell>

        <TableCell className="border text-right text-xs tabular-nums">
          {stock}
        </TableCell>

        <TableCell className="border text-xs">
          {is_active ? (
            <Badge variant="success" className="font-normal">
              <div className="size-1.5 rounded-full bg-current" /> Active
            </Badge>
          ) : (
            <Badge variant="neutral" className="font-normal">
              <div className="size-1.5 rounded-full bg-current" /> Inactive
            </Badge>
          )}
        </TableCell>

        <TableCell className="w-18 border text-center text-xs">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="icon-sm" variant="ghost">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/products/inventory" target="_blank">
                  <Eye />
                  View on Store
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/products/inventory">
                  <Pencil />
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={handleDeleteSelect}
                asChild
                className="text-destructive focus:text-destructive"
              >
                <Link to="/products/inventory">
                  <Trash2 className="text-destructive" />
                  Delete
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete product?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{name}&quot;</span>? This action
            cannot be undone.
          </>
        }
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        loadingText="Deleting"
        variant="destructive"
      />
    </>
  );
}
