import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, Store } from "lucide-react";
import toast from "react-hot-toast";
import Branding from "./Branding";
import Location from "./Location";
import SocialMedia from "./SocialMedia";
import StoreInfo from "./StoreInfo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { breadcrubms } from "@/features/admin/utils/constants/breadcrumbs";
import {
  createSocialMediaPayload,
  createStorePayload,
} from "@/features/admin/utils/storeHelpers";

export default function StoreForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const { data: countries, isLoading: isCountriesLoading } = useGetQuery({
    endpoint: "/api/v1/country",
    enabled: true,
    queryKey: ["countries"],
  });

  const { data: socialMediaData, isLoading: isSocialMediaDataLoading } =
    useGetQuery({
      endpoint: `/api/v1/general/socialMedia/${id}`,
      enabled: !!id,
      queryKey: ["socialMedia", id],
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
      email: store?.contact_email ?? "",
      mobile: store?.contact_phone ?? "",
      telephone: store?.contact_telephone ?? "",
      countries: savedCountries ?? [],
      default_country_id: store?.default_country_id ?? null,
      default_country_address: store?.default_country_address ?? null,
      is_active: store?.is_active ?? true,
      facebook: socialMediaData?.data?.facebook ?? "",
      instagram: socialMediaData?.data?.instagram ?? "",
      x: socialMediaData?.data?.x ?? "",
      youtube: socialMediaData?.data?.youtube ?? "",
      tiktok: socialMediaData?.data?.tiktok ?? "",
      pinterest: socialMediaData?.data?.pinterest ?? "",
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

  const { mutate: socialMediaMutate, isPending: isSocialMediaPending } =
    usePostMutation({
      endpoint: "/api/v1/general/socialMedia",
      isTokenRequired: true,
    });

  const { mutate: updateSocialMedia, isPending: isSocialMediaUpdating } =
    usePatchMutation({
      endpoint: `/api/v1/general/socialMedia/${id}/${socialMediaData?.data?.id}`,
      isTokenRequired: true,
    });

  const onSubmit = (data) => {
    const storePayload = createStorePayload({
      ...data,
    });
    const socialMediaPayload = createSocialMediaPayload(data, store?.id);

    const onSuccess = (data) => {
      if (!data?.success) return toast.error(data?.message);
      toast.success(data?.message);
      navigate("/stores");
    };

    const onError = (error) => {
      console.log(error);
    };

    // social media
    if (!socialMediaData?.data?.id) {
      socialMediaMutate(socialMediaPayload, {
        onError: (error) => console.log(error),
      });
    } else {
      updateSocialMedia(socialMediaPayload, {
        onError: (error) => console.log(error),
      });
    }

    // store
    if (!isEditMode) {
      mutate(storePayload, {
        onSuccess,
        onError,
      });
    } else {
      update(storePayload, {
        onSuccess,
        onError,
      });
    }
  };

  const isLoading =
    isStoreLoading ||
    isSocialMediaDataLoading ||
    isPending ||
    isUpdating ||
    isSocialMediaUpdating ||
    isSocialMediaPending;
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
            <Location
              form={form}
              countries={countries}
              isLoading={isCountriesLoading}
            />
            <StoreInfo form={form} />
            <SocialMedia form={form} />
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
