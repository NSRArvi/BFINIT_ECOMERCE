import Dashboard from "../components/sections/home/Dashboard";
import Onboard from "../components/sections/home/Onboard";
import useSetupStatus from "../hooks/useSetupStatus";
import { getSetupSteps } from "../utils/constants/setupSteps";

export default function Home() {
  const { data } = useSetupStatus();

  const setupProgress = {
    hasStore: data?.data?.hasStore ?? false,
    hasProduct: data?.data?.hasProduct ?? false,
    hasPayment: data?.data?.hasPaymentMethod ?? false,
    hasDomain: data?.data?.hasDomainOrSubdomain ?? false,
  };

  const steps = getSetupSteps(setupProgress);

  return setupProgress?.hasStore ? (
    <Dashboard setupProgress={setupProgress} steps={steps} />
  ) : (
    <Onboard setupProgress={setupProgress} steps={steps} />
  );
}
