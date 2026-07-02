import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/auth/useAuth";

export default function GuidePrompt() {
  const { user } = useAuth();
  const userData = user?.data?.user;

  const [showGuide, setShowGuide] = useState(true);

  const handleGuideClose = () => {
    setShowGuide(false);
    localStorage.setItem(`guideKey_${userData?.id}`, "dismissed");
  };

  useEffect(() => {
    if (!userData?.id) return;
    setShowGuide(
      localStorage.getItem(`guideKey_${userData.id}`) !== "dismissed",
    );
  }, [userData?.id]);

  if (!showGuide) return null;

  return (
    <Card className="bg-muted/50 relative shrink-0 overflow-hidden">
      {/* Close Button */}
      <button
        onClick={handleGuideClose}
        className="bg-background hover:text-foreground text-muted-foreground absolute top-2 right-2 flex size-5 items-center justify-center rounded-full border transition-all hover:cursor-pointer"
        aria-label="Close guide"
      >
        <X className="size-3" />
      </button>

      <CardContent className="space-y-2.5">
        <div className="space-y-1">
          <h3 className="text-foreground text-xs font-semibold">
            New to BFINIT?
          </h3>
          <p className="text-muted-foreground text-[11px] leading-tight">
            Download the guide to set up your store step by step.
          </p>
        </div>

        <Button asChild size="sm" className="h-7 w-full">
          <a
            href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Help Guide
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
