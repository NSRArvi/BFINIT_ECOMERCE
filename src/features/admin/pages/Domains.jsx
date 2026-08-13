import { Link } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DomainSkeleton from "../components/skeletons/DomainSkeleton";
import DomainOwnership from "../components/sections/domains/DomainOwnership";
import NewDomain from "../components/sections/domains/NewDomain";
import DomainField from "../components/sections/domains/DomainField";
import EmptyState from "@/components/shared/EmptyState";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import DNSConfiguration from "../components/sections/domains/DNSConfiguration";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Domains() {
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
    endpoint: "/api/v1/tenant/domains",
    isTokenRequired: true,
  });

  const isDomainIntegrated = Boolean(data?.data?.id);

  const onSubmit = (data) => {
    const payload = {
      domain: data.domain,
      type: "store",
      storeId: activeStore?.id,
    };

    if (!isDomainIntegrated) {
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
  } else if (
    !isLoading &&
    !isDomainIntegrated &&
    form.watch("domainOwnership") === "need-domain"
  ) {
    content = (
      <>
        <DomainOwnership form={form} />
        <NewDomain />
      </>
    );
  } else if (
    !isLoading &&
    !isDomainIntegrated &&
    form.watch("domainOwnership") === "has-domain"
  ) {
    content = (
      <>
        <DomainOwnership form={form} />
        <DomainField
          form={form}
          isDomainIntegrated={isDomainIntegrated}
          data={data?.data}
        />
      </>
    );
  } else {
    content = (
      <>
        <DomainField
          form={form}
          isDomainIntegrated={isDomainIntegrated}
          data={data?.data}
        />
        <DNSConfiguration />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.domain} />

      <PageHeader
        icon={Globe}
        title="Domain Settings"
        description="Configure a custom domain for your store"
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

            <div className="flex flex-col-reverse gap-4 lg:flex-row">
              <Button disabled={isSubmitting} type="submit" size="sm">
                {isSubmitting ? "Connecting..." : "Connect Domain"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
