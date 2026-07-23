import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, Truck } from "lucide-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import { Form } from "@/components/ui/form";
import PageHeader from "@/components/shared/PageHeader";
import ShippingDetails from "../components/sections/shipping-zone-form/ShippingDetails";
import ShippingLocation from "../components/sections/shipping-zone-form/ShippingLocation";
import ShippingRates from "../components/sections/shipping-zone-form/ShippingRates";
import { Spinner } from "@/components/ui/spinner";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { cn } from "@/lib/utils";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { transformZoneToFormValues } from "../utils/transformZoneToFormValues";
import { shippingZoneSchema } from "../schemas/shippingZoneSchema";

export default function ShippingZoneForm() {
  const { id, storeId } = useParams();
  const navigate = useNavigate();
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/delivery-zone/${id}/${storeId}`,
    enabled: !!id && !!storeId,
    isTokenRequired: true,
    queryKey: ["delivery-zone", id, storeId],
  });

  const form = useForm({
    resolver: zodResolver(shippingZoneSchema),
    defaultValues: {
      name: "",
      country_id: undefined,
      zone_type: "",
      priority: "",
      is_active: true,
      is_default: false,
      locations: [],
      rates: [],
    },
    values: data?.data ? transformZoneToFormValues(data.data) : undefined,
  });
  const { handleSubmit } = form;

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/delivery-zone",
    isTokenRequired: true,
  });

  const { mutate: update, isPending: isUpdatePending } = usePatchMutation({
    endpoint: `/api/v1/delivery-zone/${id}/${storeId}`,
    queryKey: ["delivery-zone", id, storeId],
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const onSuccess = (data) => {
      if (!data?.success) {
        return toast.error(data?.message);
      }
      toast.success(data?.message);
      navigate("/shipping-zones");
    };

    const onError = (error) => {
      console.log(error);
    };

    if (id) {
      update(data, {
        onSuccess,
        onError,
      });
      return;
    }

    mutate(
      { store_id: activeStore?.id, ...data },
      {
        onSuccess,
        onError,
      },
    );
  };

  const isDisabled = isPending || isUpdatePending || isLoading;
  const btnLabel = id ? "Save Changes" : "Save";

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.addShippingZone} />

      <PageHeader
        icon={Truck}
        title="Add Shipping Zone"
        description="Create a shipping zone to organize destinations and shipping rates"
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isDisabled} className="space-y-6">
            <ShippingDetails form={form} />
            <ShippingLocation form={form} />
            <ShippingRates form={form} />

            <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
              <Button asChild size="sm" variant="outline">
                <Link to="/">
                  <ChevronLeft /> Back to Home
                </Link>
              </Button>

              <Button
                disabled={isDisabled}
                type="submit"
                size="sm"
                className={cn("min-w-[91px]", id && "min-w-[107px]")}
              >
                {isPending || isUpdatePending ? (
                  <>
                    <Spinner /> Saving
                  </>
                ) : (
                  btnLabel
                )}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}
