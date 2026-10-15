import { useEffect, useState } from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressRing from "./ProgressRing";
import StepRow from "./StepRow";
import useAuth from "@/hooks/auth/useAuth";

export default function SetupGuide({ setupProgress = {}, steps = [] }) {
  const { user } = useAuth();
  const [showSetupGuide, setShowSetupGuide] = useState(true);

  const current = steps.find(
    (s) => !s.done && (!s.requiresStore || setupProgress?.hasStore),
  );
  const totalSteps = steps?.length;
  const done = steps?.filter((s) => s.done)?.length;
  const canDismiss = setupProgress.hasStore;

  const handleDismiss = () => {
    setShowSetupGuide(false);
    localStorage.setItem(
      `setup-guide-dismissed:${user?.data?.user?.id}`,
      "dismissed",
    );
  };

  useEffect(() => {
    if (!user?.data?.user?.id) return;
    setShowSetupGuide(
      localStorage.getItem(`setup-guide-dismissed:${user?.data?.user?.id}`) !==
        "dismissed",
    );
  }, [user]);

  if (!showSetupGuide) {
    return null;
  }

  return (
    <div className="bg-muted/50 space-y-3 rounded-xl border">
      <header className="space-y-3 px-4 pt-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium">Setup guide</h2>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <ProgressRing done={done} total={totalSteps} />
              {done} of {totalSteps} completed
            </span>

            {canDismiss && (
              <Button
                onClick={handleDismiss}
                size="icon"
                variant="ghost"
                className="size-6"
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <ol className="flex flex-col gap-0.5 px-2">
        {steps.map((step) => (
          <StepRow key={step.id} step={step} isOpen={current.id === step.id} />
        ))}
      </ol>

      <p className="text-muted-foreground px-4 pb-2 text-xs">
        {setupProgress?.hasStore
          ? "Your store is created. The rest is optional and can be done in any order."
          : "Creating your store is the only required step."}{" "}
        Need help?{" "}
        <Link
          href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
          target="_blank"
          className="text-foreground underline underline-offset-2"
        >
          Read the guide
        </Link>
      </p>
    </div>
  );
}
