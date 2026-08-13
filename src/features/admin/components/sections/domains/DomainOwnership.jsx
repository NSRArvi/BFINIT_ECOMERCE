import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const DomainOwnership = ({ form }) => {
  return (
    <div className="bg-card rounded-lg border p-5">
      {/* Header Section */}
      <div className="mb-5 space-y-0.5">
        <h3 className="text-sm font-medium">Domain Ownership Check</h3>
        <p className="text-muted-foreground text-xs">
          Tell us about your domain situation so we can guide you through the
          right process
        </p>
      </div>

      <FormField
        control={form.control}
        name="domainOwnership"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <div className="flex gap-2 rounded-[10px] border px-4 py-3">
                  <RadioGroupItem
                    value="has-domain"
                    id="has-domain"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="has-domain"
                    className="w-full cursor-pointer flex-col items-start gap-1 text-xs"
                  >
                    <p>Yes, I have a domain</p>
                    <p className="text-muted-foreground font-normal">
                      I already own a domain and want to connect it to my store
                    </p>
                  </Label>
                </div>
                <div className="flex gap-2 rounded-[10px] border px-4 py-3">
                  <RadioGroupItem
                    value="need-domain"
                    id="need-domain"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="need-domain"
                    className="w-full cursor-pointer flex-col items-start gap-1 text-xs"
                  >
                    <p>No, I need to buy one</p>
                    <p className="text-muted-foreground font-normal">
                      Help me purchase a domain from trusted registrars
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DomainOwnership;
