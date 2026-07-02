import { FieldDescription, FieldLegend } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function StoreInfo({ form }) {
  return (
    <div className="bg-card rounded-lg p-5">
      <FieldLegend>Store Information</FieldLegend>
      <FieldDescription>
        Enter your store name and contact details for customer communication
      </FieldDescription>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Please enter your store name",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Store Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter store name" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
