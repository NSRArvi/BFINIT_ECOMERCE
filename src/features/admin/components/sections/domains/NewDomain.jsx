import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NewDomain() {
  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="space-y-0.5">
        <h3 className="text-sm font-semibold">Purchase a domain</h3>
        <p className="text-muted-foreground text-xs">
          Register a domain through our domain registration partner.
        </p>
      </div>

      <div className="mt-5 rounded-lg border p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
              <span className="text-xs font-medium">BF</span>
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold">
                BFINIT Domain Registration
              </h4>

              <p className="text-muted-foreground text-xs">
                Starting at $23.99/year for .COM
              </p>
            </div>
          </div>

          <Button asChild size="sm">
            <Link
              to="https://www.secureserver.net/?plid=599412"
              target="_blank"
              rel="noopener noreferrer"
            >
              Purchase domain
            </Link>
          </Button>
        </div>

        <p className="text-muted-foreground mt-3 text-xs">
          After purchasing your domain, return here to connect it to your store.
        </p>
      </div>
    </div>
  );
}
