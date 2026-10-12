import { SiStripe } from "react-icons/si";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import StripeConnectCard from "../components/sections/stripe/StripeConnectCard";
import StripeConnectedCard from "../components/sections/stripe/StripeConnectedCard";
import StripeConnectSkeleton from "../components/skeletons/StripeConnectSkeleton";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Payments() {
  const { user } = useAuth();
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/stores/${activeStore?.id}/connect/status`,
    enabled: !!activeStore?.id && !!user?.token,
    isTokenRequired: true,
    queryKey: ["stripe", activeStore?.id],
  });

  let content = null;

  if (isLoading) {
    content = <StripeConnectSkeleton />;
  } else if (!data?.data?.is_ready) {
    content = (
      <StripeConnectCard
        status={data?.data?.account_id ? "incomplete" : "new"}
      />
    );
  } else {
    content = <StripeConnectedCard isEnabled={true} />;
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.stripePayment} />

      <PageHeader
        icon={SiStripe}
        title="Stripe"
        description="Accept payments and receive payouts with Stripe"
        showStoreName={false}
      />

      {content}
    </section>
  );
}
