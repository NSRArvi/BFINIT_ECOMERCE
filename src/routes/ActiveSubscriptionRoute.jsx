import { Navigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import useSubscription from "@/features/admin/hooks/useSubscription";

export default function ActiveSubscriptionRoute({ children }) {
  const { isLoading, isExpired } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-45px)] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isExpired) {
    return <Navigate to="/" replace />;
  }

  return children;
}
