import { Rocket } from "lucide-react";
import SetupGuide from "./onboard/SetupGuide";
import useAuth from "@/hooks/auth/useAuth";

export default function Onboard({ setupProgress, steps }) {
  const { user } = useAuth();

  const setupComplete =
    setupProgress.hasStore &&
    setupProgress.hasProduct &&
    setupProgress.hasPayment &&
    setupProgress.hasDomain;

  const showGuide = !setupComplete;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6 pt-10">
      <header className="flex items-center gap-3">
        <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
          <Rocket className="size-4" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-base font-semibold">Let's get your store live</h1>
          <p className="text-muted-foreground max-w-md text-xs">
            Hi {user?.data?.user?.name}, follow this guide to launch your first
            store.
          </p>
        </div>
      </header>

      {showGuide && <SetupGuide setupProgress={setupProgress} steps={steps} />}
    </div>
  );
}
