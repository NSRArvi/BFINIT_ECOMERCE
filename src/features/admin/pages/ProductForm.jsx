import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, PackagePlus, Store } from "lucide-react";
import toast from "react-hot-toast";
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
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { buildProductPayload } from "../utils/productHelper";
import { productSchema } from "../schemas/productSchema";

export default function ProductForm() {
  const navigate = useNavigate();
  const { activeStore } = useSelectedStore();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category_id: undefined,
      sub_category_id: undefined,
      brand_id: undefined,
      tags: [],
      short_description: "",
      description: "",
      is_hot_deal: false,
      is_new_arrival: false,
      is_featured: false,
      is_best_selling: false,
      is_flash_deal: false,
      flash_deal_start_date: null,
      flash_deal_end_date: null,
      image: null,
      images: [],
      pricing: [
        {
          country_id: undefined,
          price: undefined,
          discount_value: undefined,
          stock: undefined,
          variants_enabled: false,
          use_default_pricing: false,
          options: [],
          variants: [],
        },
      ],
    },
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
          <fieldset disabled={isPending} className="space-y-6">
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
                disabled={isPending}
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
