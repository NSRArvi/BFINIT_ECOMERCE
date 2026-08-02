import {
  Clock,
  KeyRound,
  Lock,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

const TRUST_POINTS = [
  { icon: Lock, text: "Secure connection with Stripe" },
  { icon: Clock, text: "Setup usually takes less than 5 minutes" },
  { icon: KeyRound, text: "No API keys or coding required" },
];

const STEPS = [
  {
    title: "Connect your Stripe account",
    desc: "Sign in to Stripe and authorize the connection.",
  },
  {
    title: "Verify your business",
    desc: "Follow the steps in Stripe to verify your business and add payout details.",
  },
  {
    title: "Start accepting payments",
    desc: "Customers can pay with supported payment methods and payouts will be sent to your bank account.",
  },
];

export default function StripeConnectCard({ status = "new" }) {
  const { activeStore } = useSelectedStore();

  const isIncomplete = status === "incomplete";

  const { refetch, isFetching } = useGetQuery({
    endpoint: `/api/v1/stores/${activeStore?.id}/connect/authorize`,
    enabled: false,
    isTokenRequired: true,
    queryKey: ["stripe", "connect", activeStore?.id],
  });

  const handleConnectStripe = async () => {
    const { data, isError } = await refetch();

    if (isError || !data?.success) {
      toast.error("Failed to start Stripe connection. Please try again.");
      return;
    }

    window.location.href = data?.data?.url;
  };

  const heading = isIncomplete
    ? "Finish setting up Stripe"
    : "Accept payments with Stripe";

  const description = isIncomplete
    ? "You started connecting Stripe but didn't finish. Continue where you left off."
    : "Connect your Stripe account to start accepting payments and receiving payouts.";

  const buttonLabel = isIncomplete ? "Continue setup" : "Connect Stripe";
  const connectingLabel = isIncomplete ? "Continuing..." : "Connecting...";

  return (
    <div className="grid rounded-lg border px-5 py-4 md:grid-cols-2">
      {/* left side content */}
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          {heading}
          {isIncomplete && (
            <Badge variant="warning" className="font-normal [&>svg]:size-3.5">
              <TriangleAlert /> Action needed
            </Badge>
          )}
        </h2>
        <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
        <Button
          disabled={isFetching}
          onClick={handleConnectStripe}
          size="sm"
          className="mt-3 min-w-[120px]"
        >
          {isFetching ? (
            <>
              <Spinner /> {connectingLabel}
            </>
          ) : (
            buttonLabel
          )}
        </Button>
        <ul className="mt-6 space-y-2">
          {TRUST_POINTS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="text-muted-foreground flex items-center gap-2 text-xs"
            >
              <Icon className="size-3.5" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* right side content */}
      <div className="mt-6 border-t pt-6 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-5">
        <h2 className="text-sm font-medium">How it works</h2>
        <ol className="mt-2 space-y-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-muted flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="bg-border mt-1 w-px flex-1" />
                )}
              </div>
              <div className="pb-1">
                <p className="text-xs font-medium">{step.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="bg-muted mt-5 inline-flex items-start gap-2.5 rounded-md p-3">
          <ShieldCheck className="text-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-xs leading-relaxed">
            Your Stripe account is connected securely using Stripe's
            authorization flow.
          </p>
        </div>
      </div>
    </div>
  );
}
