import { Link } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import SearchEnginePreview from "./SearchEnginePreview";
import useSelectedStore from "@/hooks/useSelectedStore";
import useStoreSeo from "@/hooks/useStoreSeo";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

export default function SeoForm() {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useStoreSeo();

  const form = useForm({
    values: {
      metaTitle: data?.data?.title ?? "",
      metaDescription: data?.data?.description ?? "",
    },
  });

  const { handleSubmit, watch } = form;

  const metaTitle = watch("metaTitle");
  const metaDescription = watch("metaDescription");

  const isUpdateMode = !!data?.data?.id;

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/general/seo",
    isTokenRequired: true,
  });

  const { mutate: patch, isPending: isPatchPending } = usePatchMutation({
    endpoint: `/api/v1/general/seo/${activeStore?.id}/${data?.data?.id}`,
    isTokenRequired: true,
  });

  const onSubmit = () => {
    const payload = {
      store_id: activeStore?.id,
      title: metaTitle,
      description: metaDescription,
    };

    const action = isUpdateMode ? patch : mutate;

    action(payload, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        toast.success(data?.message);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const btnLabel = isUpdateMode ? "Update" : "Save";
  const isDisabled = isLoading || isPending || isPatchPending;
  const isSubmitting = isPending || isPatchPending;

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

        <SearchEnginePreview
          metaTitle={metaTitle}
          metaDescription={metaDescription}
        />

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link to="/">
              <ChevronLeft /> Back to Home
            </Link>
          </Button>

          <Button type="submit" disabled={isDisabled} size="sm">
            {isSubmitting && <Spinner />}
            {btnLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
