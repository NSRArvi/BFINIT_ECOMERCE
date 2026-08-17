import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

const subdomainStatusDisplay = {
  pending: {
    label: "Setting up",
    variant: "warning",
    message: "Your store URL is being set up. This usually takes 48-72 hours.",
    showSupport: false,
  },
  verified: {
    label: "Connected",
    variant: "success",
    message:
      "Your store is available at this URL and can be used while no custom domain is connected.",
    showSupport: false,
  },
  failed: {
    label: "Setup failed",
    variant: "destructive",
    message: "Having trouble setting up your store URL?",
    showSupport: true,
  },
  disabled: {
    label: "Disabled",
    variant: "neutral",
    message: "Your store URL is disabled.",
    showSupport: true,
  },
};

export default function SubDomainStatus() {
  const { activeStore } = useSelectedStore();

  const { data: storeDetails } = useGetQuery({
    endpoint: `/api/v1/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["store", activeStore?.id],
  });

  const { label, variant, message, showSupport } =
    subdomainStatusDisplay[storeDetails?.data?.subdomain_status] ??
    subdomainStatusDisplay.pending;

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {storeDetails?.data?.public_subdomain}.bfinit.com
            </span>

            <Badge variant={variant}>{label}</Badge>
          </div>

          <p className="text-muted-foreground text-xs">Default store URL</p>
        </div>

        {showSupport && (
          <Button asChild variant="outline" size="sm">
            <Link
              to="https://bfinit.com/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact support
            </Link>
          </Button>
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-muted-foreground text-xs">{message}</p>

        {storeDetails?.data?.subdomain_status === "pending" && (
          <Button asChild variant="link" size="sm" className="has-[>svg]:px-0">
            <Link
              to={`https://shopadmin.bfinit.com/stores/${activeStore?.id}`}
              target="_blank"
            >
              Use your alternative store URL
              <ExternalLink className="size-3" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
