import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Image } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { Badge } from "@/components/ui/badge";

export default function AddSubcategoryModal({ dialogOpen, setDialogOpen }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/category/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["categories", activeStore?.id],
  });

  const categories = data?.data ?? [];

  const imageRef = useRef();
  const form = useForm({
    values: {
      name: "",
      image: null,
      categoryId: null,
      storeId: activeStore?.id,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const handleImgChange = (e, onChange) => {
    const files = e.target.files;
    const file = files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 2000 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    const imgData = {
      id: crypto.randomUUID(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      isNew: true,
    };

    onChange(imgData);
  };

  const handleFormClose = () => {
    setDialogOpen(false);
    reset();
  };

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/subcategory",
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const payload = new FormData();

    payload.append("name", data.name);
    payload.append("category_id", data.categoryId);
    payload.append("store_id", activeStore?.id);
    if (data?.image?.file) {
      payload.append("image", data.image.file);
    }

    mutate(payload, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        handleFormClose();
        toast.success(data?.message);
        queryClient.invalidateQueries(["subcategories", activeStore?.id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
          <DialogDescription className="text-xs">
            Select a parent category and define sub-items
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="categoryId"
              rules={{ required: "Please select a category" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Parent Category <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            isLoading
                              ? "Loading categories..."
                              : "Select a category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Please enter a subcategory name" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Subcategory Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Electronics" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image{" "}
                    <Badge variant="secondary" className="text-[10px]">
                      Optional
                    </Badge>
                  </FormLabel>
                  <p className="text-muted-foreground text-[10px]">
                    PNG, JPG, WEBP. Max 2MB.
                  </p>
                  <FormControl>
                    <div className="shrink-0 space-y-2">
                      <div
                        onClick={() => imageRef?.current?.click()}
                        className={`bg-muted group hover:border-foreground/50 flex h-24 w-full items-center justify-center overflow-hidden rounded-md border border-dashed py-1 transition-colors hover:cursor-pointer ${
                          errors.image
                            ? "border-destructive hover:border-destructive"
                            : ""
                        }`}
                      >
                        {field.value ? (
                          <img
                            src={field.value.preview}
                            alt="Subcategory preview"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Image
                              strokeWidth={1.5}
                              className="text-muted-foreground group-hover:text-foreground size-6"
                            />
                            <span className="text-muted-foreground text-[10px]">
                              Upload
                            </span>
                          </div>
                        )}
                      </div>

                      <input
                        ref={imageRef}
                        onChange={(e) => handleImgChange(e, field.onChange)}
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                        className="hidden"
                      />

                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                onClick={handleFormClose}
                type="button"
                size="sm"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                size="sm"
                className="min-w-[125px]"
              >
                {isPending ? (
                  <>
                    <Spinner /> Adding...
                  </>
                ) : (
                  "Add Subcategory"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
