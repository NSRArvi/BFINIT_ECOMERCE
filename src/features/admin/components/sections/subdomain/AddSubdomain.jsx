import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AddSubdomain({ form }) {
  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">Add your subdomain</h3>
        <p className="text-muted-foreground text-xs">
          Enter the full subdomain you want to use for your store.
        </p>
      </div>

      <FormField
        control={form.control}
        name="subdomain"
        rules={{
          required: "Subdomain is required",
          pattern: {
            value:
              /^(?!www\.)(?!https?:\/\/)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.){2,}[a-zA-Z]{2,}$/,
            message: "Enter a valid subdomain, e.g. shop.example.com",
          },
        }}
        render={({ field }) => (
          <FormItem className="mt-5">
            <FormLabel>
              Subdomain <span className="text-destructive">*</span>
            </FormLabel>

            <FormControl>
              <Input placeholder="shop.example.com" {...field} />
            </FormControl>

            <FormDescription className="text-xs">
              Enter the full subdomain (e.g. shop.example.com) without "www" or
              "https://".
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
