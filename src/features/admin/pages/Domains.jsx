import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks/api/usePostMutation";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import DomainSkeleton from "../components/skeletons/DomainSkeleton";
import DomainOwnership from "../components/sections/domains/DomainOwnership";
import NewDomain from "../components/sections/domains/NewDomain";
import DomainField from "../components/sections/domains/DomainField";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";

export default function Domains() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const form = useForm({
    defaultValues: {
      domainOwnership: "has-domain",
    },
    mode: "onChange",
  });

  const { handleSubmit, setValue } = form;
  const storeId = selectedStore?.storeId;

  // Auto-set storeId when selectedStore changes
  useEffect(() => {
    if (storeId) {
      setValue("storeId", storeId);
    }
  }, [storeId, setValue]);

  // Query get api fetch conditions
  const isFetchEnabled = !!storeId && !!user?.token && !!user?.data?.clientid;

  // Fetch domain data is domain added or not
  const { data, isLoading } = useGetQuery({
    endpoint: `/publish/status/${storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["/publish/status", storeId],
    enabled: isFetchEnabled,
  });

  // Add new domain
  const { mutate, isPending: isSubmitting } = usePostMutation({
    endpoint: `/publish/domain/add/${storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // Update domain mutation hook
  const { mutate: updateDomain, isPending: isUpdating } = useUpdateMutation({
    endpoint: `/publish/domain/update/${data?.data?._id}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const isDomainIntegrated = data && data?.message === "Domain Record Found";
  const hasDomainOwnership = form.watch("domainOwnership") === "has-domain";
  const isDomainActive = data?.data?.isActive;

  const showDraftConnectBtn =
    (!isLoading &&
      !isDomainIntegrated &&
      hasDomainOwnership &&
      !isDomainActive) ||
    (isDomainIntegrated && isDomainActive);

  // Add or Update domain submit handler
  const onSubmit = (values) => {
    if (isDomainIntegrated && data.data.domainName === values.domain) {
      return toast.error(
        "This domain is already connected. Please enter a different domain name.",
      );
    }

    const payload = { domainName: values.domain };

    // add new domain
    if (!isDomainIntegrated) {
      mutate(payload, {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["/publish/status", storeId]);
          toast.success(`Successfully connected ${data?.domain}`);
        },
        onError: (err) => {
          console.error(err);
          toast.error("Failed to connect domain. Please try again.");
        },
      });
      return;
    }

    // update domain name
    updateDomain(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["/publish/status", storeId]);
        toast.success(`Domain updated to ${data?.domain || values.domain}`);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to update domain. Please try again.");
      },
    });
  };

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="Store Required"
        description="Create a store first before connecting a custom domain name."
      />
    );
  }

  return (
    <div className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.domain} />

      <PageHeader
        icon={Globe}
        title="Domain Settings"
        description="Configure a custom domain for"
      />

      {/* Main Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isLoading ? (
            <DomainSkeleton />
          ) : (
            <>
              {!isDomainIntegrated && <DomainOwnership form={form} />}

              {/* Conditional Domain field Rendering based on selection */}
              {form.watch("domainOwnership") === "need-domain" && <NewDomain />}

              {form.watch("domainOwnership") === "has-domain" && (
                <DomainField
                  form={form}
                  isDomainIntegrated={isDomainIntegrated}
                  data={data?.data}
                />
              )}
            </>
          )}

          {/* Bottom buttons */}
          <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:justify-between">
            <Button
              variant="outline"
              size="sm"
              type="button"
              asChild
              className="text-xs"
            >
              <Link to="/">
                <ChevronLeft />
                Back to Home
              </Link>
            </Button>

            {/* Submit button for custom domain */}
            {showDraftConnectBtn && (
              <div className="flex flex-col-reverse gap-4 lg:flex-row">
                {/* <Button variant="outline" size="lg" type="button">
                  Save as Draft
                </Button> */}

                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || isUpdating}
                  className="text-xs"
                >
                  {isDomainIntegrated
                    ? isUpdating
                      ? "Updating..."
                      : "Update Domain"
                    : isSubmitting
                      ? "Connecting..."
                      : "Connect Domain"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
