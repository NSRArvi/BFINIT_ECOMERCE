import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import ConfirmationDialog from "../modals/ConfirmationDialog";
import useDeleteMutation from "@/hooks-v2/api/useDeleteMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import useSearchParamState from "@/hooks/useSearchParamState";

export default function ShippingZoneRow({ zone }) {
  const [search] = useSearchParamState("search");
  const [page] = useSearchParamState("page", "1");
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const {
    id,
    store_id,
    name,
    zone_type,
    country,
    priority,
    rates,
    is_active,
    is_default,
  } = zone || {};

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteSelect = (e) => {
    e.preventDefault();
    setIsDeleteOpen(true);
    setIsDropdownOpen(false);
  };

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/api/v1/delivery-zone/${id}/${store_id}`,
    isTokenRequired: true,
  });

  const handleDelete = () => {
    mutate(null, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "delivery-zones",
          activeStore?.id,
          page,
          search,
        ]);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="border text-xs">{name}</TableCell>

        <TableCell className="border text-xs">
          {country.flag_emoji} {country.name}
        </TableCell>

        <TableCell className="border text-xs capitalize">
          {zone_type === "country_wide" ? "country wide" : zone_type}
        </TableCell>

        <TableCell className="w-20 border text-right text-xs">
          {rates.length}
        </TableCell>

        <TableCell className="w-20 border text-right text-xs">
          {priority}
        </TableCell>

        <TableCell className="w-28 border text-center text-xs">
          {is_default && (
            <Badge variant="success" showDot>
              Default
            </Badge>
          )}
        </TableCell>

        <TableCell className="w-24 border text-center text-xs">
          <Switch checked={is_active} />
        </TableCell>

        <TableCell className="w-18 border text-right text-xs">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="icon-sm" variant="ghost">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/shipping-zones/edit/${id}/${store_id}`}>
                  <Pencil />
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={handleDeleteSelect}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="text-destructive" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete shipping zone?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{name}&quot;</span>? This will
            permanently remove the shipping zone and all of its delivery rates.
            This action cannot be undone.
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
