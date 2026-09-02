import { Link } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import DomainSkeleton from "../components/skeletons/DomainSkeleton";
import SubdomainOwnership from "../components/sections/subdomain/SubdomainOwnership";
import { Form } from "@/components/ui/form";
import AddSubdomain from "../components/sections/subdomain/AddSubdomain";
import SubdomainStatus from "../components/sections/subdomain/SubdomainStatus";
import NewDomain from "../components/sections/domains/NewDomain";
import EmptyState from "@/components/shared/EmptyState";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import DNSConfiguration from "../components/sections/domains/DNSConfiguration";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Subdomain() {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const form = useForm({
    defaultValues: {
      domainOwnership: "has-domain",
    },
  });

  const { handleSubmit } = form;

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/tenant/domains/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["domain", activeStore?.id],
  });

  const { mutate, isPending: isSubmitting } = usePostMutation({
    endpoint: "/api/v1/tenant/domains/createSubDomain",
    isTokenRequired: true,
  });

  const isSubdomainIntegrated = Boolean(data?.data?.public_subdomain);
  const domainOwnership = useWatch({
    control: form.control,
    name: "domainOwnership",
  });
  const needsDomain = domainOwnership === "need-domain";
  const hasDomain = domainOwnership === "has-domain";

  const onSubmit = (data) => {
    const payload = {
      store_id: activeStore?.id,
      public_subdomain: data.subdomain,
      type: "store",
    };

    if (!isSubdomainIntegrated) {
      mutate(payload, {
        onSuccess: (data) => {
          if (!data.success) return toast.error(data.message);
          toast.success(data.message);
          queryClient.invalidateQueries(["/publish/status", activeStore?.id]);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  if (!activeStore) {
    return (
      <EmptyState
        title="Store Required"
        description="Create a store first before connecting a custom domain."
        actionText="Create Store"
        actionPath="/stores/create"
      />
    );
  }

  let content = null;

  if (isLoading) {
    content = <DomainSkeleton />;
  } else if (!isLoading && !isSubdomainIntegrated && needsDomain) {
    content = (
      <>
        <SubdomainOwnership form={form} />
        <NewDomain />
      </>
    );
  } else if (!isLoading && !isSubdomainIntegrated && hasDomain) {
    content = (
      <>
        <SubdomainOwnership form={form} />
        <AddSubdomain form={form} />
      </>
    );
  } else {
    content = (
      <>
        <SubdomainStatus subdomain={data?.data} />
        <DNSConfiguration />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.subdomain} />

      <PageHeader
        icon={Network}
        title="Subdomain Settings"
        description="Configure a custom subdomain for your store"
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {content}

          <div className="flex flex-col-reverse gap-4 border-t pt-6 lg:flex-row lg:justify-between">
            <Button type="button" asChild size="sm" variant="outline">
              <Link to="/">
                <ChevronLeft />
                Back to Home
              </Link>
            </Button>

            {!isSubdomainIntegrated && (
              <Button disabled={isSubmitting} type="submit" size="sm">
                {isSubmitting ? "Connecting..." : "Connect Subdomain"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
