import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function DomainField({ form, isDomainIntegrated, data }) {
  return (
    <>
      <div className="bg-card rounded-lg border p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium">Connect Your Domain</h3>
            <p className="text-muted-foreground text-xs">
              Enter your domain details and configure DNS records to complete
              the integration
            </p>
          </div>
        </div>

        {isDomainIntegrated ? (
          <div className="bg-muted/50 mt-5 rounded-lg border px-3.5 py-2.5">
            <p className="text-xs">
              <span className="text-muted-foreground">Current Domain:</span>{" "}
              <span className="font-medium">{data?.domain}</span>
            </p>
          </div>
        ) : (
          <FormField
            control={form.control}
            name="domain"
            rules={{
              required: "Domain name is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid domain name",
              },
            }}
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>
                  Domain Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="example.com" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter your root domain without &apos;www&apos; or
                  &apos;https://&apos; (e.g., example.com)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </>
  );
}
