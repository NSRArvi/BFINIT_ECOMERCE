import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";

const subdomainStatusConfig = {
  pending: {
    label: "Verifying",
    variant: "warning",
    supportTitle: "Subdomain verification is in progress",
    supportDescription:
      "Verification can take some time. Contact support if you need help with your subdomain.",
  },
  verified: {
    label: "Connected",
    variant: "success",
    supportTitle: "Need to change your subdomain?",
    supportDescription:
      "Contact support to update or replace your store's subdomain.",
  },
  failed: {
    label: "Connection failed",
    variant: "destructive",
    supportTitle: "Having trouble connecting your subdomain?",
    supportDescription:
      "Contact support for help resolving the connection issue.",
  },
  disabled: {
    label: "Disabled",
    variant: "neutral",
    supportTitle: "Your subdomain is disabled",
    supportDescription:
      "Contact support to reactivate or replace your store's subdomain.",
  },
};

export default function SubdomainStatus({ subdomain }) {
  const {
    public_subdomain,
    subdomain_status,
    subdomain_verified_at,
    subdomain_created_at,
  } = subdomain || {};
  const { label, variant, supportTitle, supportDescription } =
    subdomainStatusConfig[subdomain_status];

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{public_subdomain}</span>
            <Badge variant={variant}>{label}</Badge>
          </div>

          <p className="text-muted-foreground text-xs">
            {subdomain_status === "verified" && subdomain_verified_at
              ? `Live since ${formatDate(subdomain_verified_at)}`
              : subdomain_status === "pending"
                ? `Requested ${formatDate(subdomain_created_at)}`
                : null}
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link to="https://bfinit.com/contact" target="_blank">
            Contact support
          </Link>
        </Button>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-xs font-medium">{supportTitle}</p>
        <p className="text-muted-foreground mt-1 text-xs">
          {supportDescription}
        </p>
      </div>
    </div>
  );
}
