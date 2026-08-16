import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AddDomain({ form }) {
  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">Add a domain</h3>
        <p className="text-muted-foreground text-xs">
          Enter the domain you want to use for your store.
        </p>
      </div>

      <FormField
        control={form.control}
        name="domain"
        rules={{
          required: "Domain name is required",
          pattern: {
            value: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid domain name",
          },
        }}
        render={({ field }) => (
          <FormItem className="mt-5">
            <FormLabel>
              Domain name <span className="text-destructive">*</span>
            </FormLabel>

            <FormControl>
              <Input placeholder="example.com" {...field} />
            </FormControl>

            <FormDescription className="text-xs">
              Enter your root domain without "www" or "https://".
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
