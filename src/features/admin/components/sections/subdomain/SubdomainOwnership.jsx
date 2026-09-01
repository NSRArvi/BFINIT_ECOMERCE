import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const SubdomainOwnership = ({ form }) => {
  return (
    <div className="bg-card rounded-lg border p-5">
      {/* Header Section */}
      <div className="mb-5 space-y-0.5">
        <h3 className="text-sm font-medium">Do you already own a domain?</h3>
        <p className="text-muted-foreground text-xs">
          A subdomain is created off a domain - tell us if you have one already
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
                    <p>Yes, I own a domain</p>
                    <p className="text-muted-foreground font-normal">
                      I&apos;ll create a subdomain on it and point it to my
                      store
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
                    <p>No, I need one</p>
                    <p className="text-muted-foreground font-normal">
                      Buy a domain through us, then connect a subdomain on it
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

export default SubdomainOwnership;
