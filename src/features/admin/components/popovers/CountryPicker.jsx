import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function CountryPicker({
  isMultipleCountries,
  availableCountries = [],
  onSelect,
}) {
  const navigate = useNavigate();
  const { activeStore } = useSelectedStore();

  const [open, setOpen] = useState(false);

  const hasCountries = availableCountries.length > 0;

  const handleManageMarkets = () => {
    setOpen(false);
    navigate(`/stores/edit/${activeStore?.id}`);
  };

  if (!isMultipleCountries) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button disabled={!hasCountries} size="sm" variant="outline">
                <Plus />
                Sell in More Countries
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-1" align="end">
              <Command>
                <CommandInput placeholder="Search country..." />

                <CommandList>
                  <CommandEmpty className="px-4 py-6 text-center">
                    <p className="text-xs font-medium">
                      No matching country found
                    </p>

                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      This country isn't available in your store's enabled
                      markets.
                    </p>

                    <Button
                      onClick={handleManageMarkets}
                      variant="link"
                      size="sm"
                      className="p-0 text-[11px]"
                    >
                      Manage Store Locations
                    </Button>
                  </CommandEmpty>

                  <CommandGroup>
                    {availableCountries.map((country) => (
                      <CommandItem
                        key={country.id}
                        onSelect={() => {
                          onSelect(country.id);
                          setOpen(false);
                        }}
                        value={country.name}
                      >
                        <span className="font-medium">{country.name}</span>

                        <span className="text-muted-foreground ml-auto text-xs">
                          {country.currency_code} ({country.abbreviation})
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </span>
      </TooltipTrigger>

      {!hasCountries && (
        <TooltipContent align="end" className="max-w-sm">
          <p className="font-medium">
            All available countries have been added.
          </p>

          <p className="text-background/75 mt-1 text-xs">
            To add more countries, manage your store locations.
          </p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
