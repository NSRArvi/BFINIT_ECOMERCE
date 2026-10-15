import Dashboard from "../components/sections/home/Dashboard";
import Onboard from "../components/sections/home/Onboard";
import { Spinner } from "@/components/ui/spinner";
import usePackageUsage from "../hooks/usePackageUsage";
import { getSetupSteps } from "../utils/constants/setupSteps";

export default function Home() {
  const { data: usageData, isLoading } = usePackageUsage();

  const hasStore = usageData?.data?.stores?.used > 0;
  const hasProduct = usageData?.data?.products?.used > 0;

  const setupProgress = {
    hasStore,
    hasProduct,
    hasPayment: false,
    hasDomain: false,
  };

  const steps = getSetupSteps(setupProgress);

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex min-h-[calc(100dvh-95px)] items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (hasStore) {
    content = <Dashboard setupProgress={setupProgress} steps={steps} />;
  } else if (!hasStore) {
    content = <Onboard setupProgress={setupProgress} steps={steps} />;
  }

  return <>{content}</>;
}
