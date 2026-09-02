import { useEffect } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import SearchEnginePreview from "./SearchEnginePreview";
import useGetStoreMeta from "@/hooks/useGetStoreMeta";
import usePostMutation from "@/hooks-v2/api/usePostMutation";

export default function TitleDescriptionForm() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();
  const { data: metaData, isLoading } = useGetStoreMeta(selectedStore?.storeId);

  const form = useForm({
    defaultValues: {
      metaId: "",
      metaTitle: "",
      metaDescription: "",
    },
  });

  const { handleSubmit, watch } = form;

  const metaId = watch("metaId");
  const metaTitle = watch("metaTitle");
  const metaDescription = watch("metaDescription");

  useEffect(() => {
    if (!isLoading) {
      if (metaData?.data?.length > 0) {
        const firstMeta = metaData.data[0];
        form.reset({
          metaId: firstMeta.id,
          metaTitle: firstMeta.Title,
          metaDescription: firstMeta.Description,
        });
      } else {
        form.reset({
          metaId: "",
          metaTitle: "",
          metaDescription: "",
        });
      }
    }
  }, [isLoading, metaData, selectedStore?.storeId, form]);

  // add seo post hook
  const { mutate, isPending } = usePostMutation({
    endpoint: `/meta/create/${selectedStore?.storeId}`,
    isTokenRequired: true,
  });

  // update seo
  const { mutate: updateMeta, isPending: isUpdatePending } = useUpdateMutation({
    endpoint: `/meta/update/${metaId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const getButtonLabel = () => {
    if (isPending || isUpdatePending) {
      return (
        <>
          <Spinner /> Saving...
        </>
      );
    }
    return metaId ? "Save Changes" : "Save SEO Settings";
  };

  const onSubmit = () => {
    const metaDataPaylod = { metaTitle, metaDescription };

    // if meata id available update form
    if (metaId) {
      updateMeta(metaDataPaylod, {
        onSuccess: () => {
          toast.success("SEO settings updated successfully!");
          queryClient.invalidateQueries(["storeMeta", selectedStore?.storeId]);
        },

        onError: (error) => {
          toast.error("Failed to update SEO settings. Please try again.");
          console.error(error);
        },
      });
    } else {
      mutate(metaDataPaylod, {
        onSuccess: () => {
          toast.success("SEO settings saved successfully!");
          queryClient.invalidateQueries(["storeMeta", selectedStore?.storeId]);
        },

        onError: (error) => {
          toast.error(
            error?.message || "Failed to save SEO settings. Please try again.",
          );
          console.error(error);
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card space-y-6 rounded-lg p-5"
      >
        <FormField
          control={form.control}
          name="metaTitle"
          rules={{
            required: "Meta Title is required",
            maxLength: {
              value: 60,
              message: "Meta Title must not exceed 60 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Meta Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your store's meta title" {...field} />
              </FormControl>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs">
                  Appears as the page title in search results
                </p>
                <p className="text-muted-foreground text-xs">
                  {field.value.length}/60
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaDescription"
          rules={{
            required: "Meta Description is required",
            maxLength: {
              value: 160,
              message: "Meta Description must not exceed 160 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Meta Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your store's meta description"
                  {...field}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs">
                  Appears as the page title in search results
                </p>
                <p className="text-muted-foreground text-xs">
                  {field.value.length}/160
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Search Engine Preview */}
        <SearchEnginePreview
          metaTitle={metaTitle}
          metaDescription={metaDescription}
          selectedStore={selectedStore}
        />

        {/* submit buttons */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link to="/">
              <ChevronLeft /> Back to Home
            </Link>
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            size="sm"
            className={`text-xs ${metaId ? "min-w-[107px]" : "min-w-[131px]"}`}
          >
            {getButtonLabel()}
          </Button>
        </div>
      </form>
    </Form>
  );
}
