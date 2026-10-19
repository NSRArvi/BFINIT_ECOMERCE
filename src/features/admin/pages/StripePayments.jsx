import { SiStripe } from "react-icons/si";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import StripeConnectCard from "../components/sections/stripe/StripeConnectCard";
import StripeConnectedCard from "../components/sections/stripe/StripeConnectedCard";
import StripeConnectSkeleton from "../components/skeletons/StripeConnectSkeleton";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "../utils/constants/breadcrumbs";

const STRIPE_STATUS = {
  0: {
    title: "Accept payments with Stripe",
    description:
      "Connect your Stripe account to start accepting payments and receiving payouts.",
    badge: null,
    variant: null,
    cta: "Connect Stripe",
  },
  1: {
    title: "Finish setting up Stripe",
    description:
      "You started connecting Stripe but didn't finish. Continue where you left off.",
    badge: "Action needed",
    variant: "warning",
    cta: "Continue setup",
  },
  3: {
    title: "Action required",
    description: "Stripe needs more information before payments can continue.",
    badge: "Restricted",
    variant: "warning",
    cta: "Fix in Stripe",
  },
  4: {
    title: "Account disabled",
    description: "Stripe has disabled this account. Contact Stripe support.",
    badge: "Disabled",
    variant: "destructive",
    cta: null,
  },
};

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
  } else if (data?.data?.status === 2) {
    content = <StripeConnectedCard isEnabled={data?.data?.is_active} />;
  } else if (data?.data?.status !== 2) {
    content = <StripeConnectCard config={STRIPE_STATUS[data?.data?.status]} />;
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
