import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, PackagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import { Form } from "@/components/ui/form";
import PageHeader from "@/components/shared/PageHeader";
import Details from "../components/sections/product-form/Details";
import Status from "../components/sections/product-form/Status";
import Images from "../components/sections/product-form/Images";
import Pricing from "../components/sections/product-form/Pricing";
import { Spinner } from "@/components/ui/spinner";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { buildProductPayload } from "../utils/productHelper";
import { EMPTY_PRODUCT } from "../utils/constants/productDefaults";
import { transformProductToFormValues } from "../utils/transformProductToFormValues";
import { productSchema } from "../schemas/productSchema";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/product/store/${activeStore?.id}/${id}`,
    enabled: !!id && !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["product", activeStore?.id, id],
  });

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: EMPTY_PRODUCT,
    values: data?.data ? transformProductToFormValues(data?.data) : undefined,
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/product",
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const payload = buildProductPayload(data, activeStore?.id);

    mutate(payload, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        toast.success(data?.message);
        queryClient.invalidateQueries(["admin", "usage"]);
        navigate("/products/inventory");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  if (!activeStore) {
    return (
      <EmptyState
        title="No Store Selected"
        description="You need an active store to add and manage products"
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.addProduct} />

      <PageHeader
        icon={PackagePlus}
        title="Add Product"
        description="Add a new product to your store's catalog."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading || isPending} className="space-y-6">
            <Details form={form} />
            <Status form={form} />
            <Images form={form} />
            <Pricing form={form} />

            <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
              <Button asChild size="sm" variant="outline">
                <Link to="/">
                  <ChevronLeft /> Back to Home
                </Link>
              </Button>

              <Button
                disabled={isLoading || isPending}
                type="submit"
                size="sm"
                className="min-w-[101px]"
              >
                {isPending ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}
