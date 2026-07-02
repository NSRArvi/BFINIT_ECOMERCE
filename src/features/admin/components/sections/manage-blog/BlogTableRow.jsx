import { useState } from "react";
import { Link } from "react-router";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
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
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import { getImgUrl } from "@/utils/getImgUrl";

export default function BlogTableRow({ blog }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { title, image, id } = blog;

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/api/v1/general/blog/${activeStore?.id}/${id}`,
    token: true,
    clientId: true,
  });

  const handleBlogDelete = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Blog deleted!");
        close();
        queryClient.invalidateQueries(["blogs", activeStore?.id]);
      },
      onError: () => {
        toast.error("Something went wrong!");
        close();
      },
    });
  };

  return (
    <>
      <TableRow>
        {/* <TableCell className="w-10 border border-l-0">
          <Checkbox />
        </TableCell> */}

        <TableCell className="border">
          <div className="flex items-start gap-3">
            <div className="aspect-square size-10 overflow-hidden rounded-md border">
              <img
                src={getImgUrl(image)}
                alt={title}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="mt-1 text-xs">
              <p title={title} className="max-w-xs truncate font-medium">
                {title}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="border text-right">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  target="_blank"
                  to={`/stores/${activeStore?.id}/blog/${id}`}
                  className="cursor-pointer text-xs font-medium"
                >
                  <Eye />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to={`/blogs/edit/${id}`}
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
        title="Delete blog?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{title}&quot;</span>? This
            action cannot be undone.
          </>
        }
        onConfirm={handleBlogDelete}
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
