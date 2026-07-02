import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, Store } from "lucide-react";
import toast from "react-hot-toast";
import Branding from "./Branding";
import Location from "./Location";
import StoreInfo from "./StoreInfo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { breadcrubms } from "@/features/admin/utils/constants/breadcrumbs";
import { createStorePayload } from "@/features/admin/utils/storeHelpers";

export default function StoreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEditMode = !!id;

  const { data: countries, isLoading: isCountriesLoading } = useGetQuery({
    endpoint: "/api/v1/country",
    enabled: true,
    queryKey: ["countries"],
  });

  const { data, isLoading: isStoreLoading } = useGetQuery({
    endpoint: `/api/v1/store/${id}`,
    enabled: !!id,
    isTokenRequired: true,
    queryKey: ["store", id],
  });

  const store = data?.data;

  const savedCountries =
    store?.country_ids && countries?.data
      ? store.country_ids.map((countryId) =>
          countries.data.find((c) => c.id === countryId),
        )
      : [];

  const form = useForm({
    values: {
      logo: store?.logo ?? null,
      favicon: store?.favicon ?? null,
      name: store?.name ?? "",
      countries: savedCountries ?? [],
      default_country_id: store?.default_country_id ?? null,
      is_active: store?.is_active ?? true,
    },
  });
  const { handleSubmit } = form;

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/store",
    isTokenRequired: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutation({
    endpoint: `/api/v1/store/${id}`,
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const formData = createStorePayload({
      ...data,
      tenantId: user?.data?.user?.id,
    });

    const onSuccess = (data) => {
      if (!data?.success) return toast.error(data?.message);
      toast.success(data?.message);
      navigate("/stores");
    };

    const onError = (error) => {
      console.log(error);
    };

    if (!isEditMode) {
      mutate(formData, {
        onSuccess: (data) => {
          form.reset();
          onSuccess(data);
        },
        onError,
      });

      return;
    }

    update(formData, {
      onSuccess,
      onError,
    });
  };

  const isLoading = isStoreLoading || isPending || isUpdating;
  const btnLabel = isEditMode ? "Update Store" : "Create Store";
  const btnLoadingLabel = isEditMode ? "Updating..." : "Creating...";

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.createStore} />

      <PageHeader
        icon={Store}
        title="Create New Store"
        description="Enter your store details to get started"
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset
            disabled={isLoading}
            className={`space-y-6 ${isLoading ? "pointer-events-none" : ""}`}
          >
            <Branding form={form} />
            <StoreInfo form={form} />
            <Location
              form={form}
              countries={countries}
              isLoading={isCountriesLoading}
            />
          </fieldset>

          {/* submit buttons */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button asChild size="sm" variant="outline">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            <Button type="submit" disabled={isLoading} size="sm">
              {isPending || isUpdating ? (
                <>
                  <Spinner /> {btnLoadingLabel}
                </>
              ) : (
                btnLabel
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
