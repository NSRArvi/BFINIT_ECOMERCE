import { CreditCard, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import { ItemGroup } from "@/components/ui/item";
import PageHeader from "@/components/shared/PageHeader";
import PaymentItem from "../components/sections/payment-methods/PaymentItem";
import PaymentMethodSkeleton from "../components/skeletons/PaymentMethodSkeleton";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function PaymentMethods() {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/dashboard/stores/${activeStore?.id}/payment-methods`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["admin", "payment-methods", activeStore?.id],
  });

  let content = null;

  if (isLoading) {
    content = <PaymentMethodSkeleton />;
  } else if (!isLoading && data?.data?.length > 0) {
    content = (
      <>
        <ItemGroup>
          {data?.data?.map((item) => (
            <PaymentItem key={item.key} item={item} />
          ))}
        </ItemGroup>
        <Alert className="bg-muted/30 [&>svg]:translate-y-0">
          <Info />
          <AlertDescription>
            At least one payment method must stay enabled.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.paymentMethods} />
      <PageHeader
        icon={CreditCard}
        title="Payment Methods"
        description="Choose how customers can pay at checkout"
      />

      {content}
    </section>
  );
}
