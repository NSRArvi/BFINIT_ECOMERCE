import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";

const domainStatusDisplay = {
  pending: {
    label: "Verifying",
    variant: "warning",
    supportTitle: "Domain verification is in progress",
    supportDescription:
      "Verification can take some time. Contact support if you need help with your domain.",
  },
  verified: {
    label: "Connected",
    variant: "success",
    supportTitle: "Need to change your domain?",
    supportDescription:
      "Contact support to update or replace your store's domain.",
  },
  failed: {
    label: "Connection failed",
    variant: "destructive",
    supportTitle: "Having trouble connecting your domain?",
    supportDescription:
      "Contact support for help resolving the connection issue.",
  },
  disabled: {
    label: "Disabled",
    variant: "neutral",
    supportTitle: "Your domain is disabled",
    supportDescription:
      "Contact support to reactivate or replace your store's domain.",
  },
};

export default function DomainStatus({ domain }) {
  const { domain: domainName, status, verified_at, created_at } = domain || {};
  const { label, variant, supportTitle, supportDescription } =
    domainStatusDisplay[status];

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{domainName}</span>
            <Badge variant={variant}>{label}</Badge>
          </div>

          <p className="text-muted-foreground text-xs">
            {status === "verified" && verified_at
              ? `Live since ${formatDate(verified_at)}`
              : status === "pending"
                ? `Requested ${formatDate(created_at)}`
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
