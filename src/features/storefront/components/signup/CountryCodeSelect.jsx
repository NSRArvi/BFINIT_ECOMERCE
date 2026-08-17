import { useState } from "react";
import { ChevronsUpDown, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function CountryCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const { data, isFetching } = useGetQuery({
    endpoint: "/api/v1/country",
    isTokenRequired: false,
    queryKey: ["countries"],
  });

  const countries = data?.data ?? [];
  const selected = countries.find((c) => c.country_code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isFetching}
          className="h-9 w-24 shrink-0 justify-between rounded-none px-2 text-sm font-normal"
        >
          {selected && `${selected.flag_emoji} ${selected.country_code}`}
          <ChevronsUpDown className="size-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 rounded-none p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>
              <SearchX className="text-muted-foreground mx-auto mb-2 size-4" />
              <p className="text-muted-foreground text-xs">
                No countries found
              </p>
            </CommandEmpty>
            <CommandGroup>
              {countries?.map((country) => (
                <CommandItem
                  key={country?.id}
                  value={`${country?.name} ${country?.short_name} ${country?.country_code}`}
                  onSelect={() => {
                    onChange(country?.country_code);
                    setOpen(false);
                  }}
                >
                  <span>{country?.flag_emoji}</span>
                  <span>{country?.name}</span>
                  <span className="text-muted-foreground ml-auto text-[11px]">
                    {country?.country_code}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
