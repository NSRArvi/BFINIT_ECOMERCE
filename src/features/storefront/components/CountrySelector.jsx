import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useCountry from "@/hooks/useCountry";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { getImgUrl } from "@/utils/getImgUrl";

export default function CountrySelector() {
  const { storeId } = useParams();
  const {
    saveCountry,
    selectedCountry,
    isLoading: isCountryLoading,
  } = useCountry();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data: storeData, isLoading } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  const countries = storeData?.data?.countries || [];

  const showSearch = countries.length > 6;

  const filtered = useMemo(() => {
    if (!query) return countries;
    const q = query.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.currency_code.toLowerCase().includes(q),
    );
  }, [countries, query]);

  useEffect(() => {
    if (!storeId || isLoading || isCountryLoading || selectedCountry) {
      setIsOpen(false);
      return;
    }

    if (countries.length === 1) {
      saveCountry(countries[0]);
      setIsOpen(false);
      return;
    }

    if (countries.length > 1) {
      setIsOpen(true);
    }
  }, [
    isLoading,
    storeId,
    countries,
    isCountryLoading,
    selectedCountry,
    saveCountry,
  ]);

  const handleSelect = (country) => {
    saveCountry(country);
    setIsOpen(false);
  };

  if (isLoading || !isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="gap-0 border-none shadow-none sm:max-w-xl"
        overlayClassName="bg-background"
      >
        {storeData?.data?.logo ? (
          <>
            <div className="mb-6 h-8 max-w-40">
              <img
                src={getImgUrl(storeData.data.logo)}
                alt={storeData.data.name}
                className="h-full w-auto object-contain object-left"
              />
            </div>
            <DialogTitle className="sr-only">{storeData.data.name}</DialogTitle>
          </>
        ) : (
          <DialogTitle className="mb-6 text-lg font-medium tracking-widest uppercase">
            {storeData.data.name}
          </DialogTitle>
        )}

        <div className="border-border/80 mb-7 border-t" />

        <DialogDescription asChild>
          <div>
            <p className="text-muted-foreground mb-3 text-[11px] font-medium tracking-widest uppercase">
              Select a country to preview pricing
            </p>
            <p className="text-muted-foreground mb-7 text-[13px] leading-6">
              Prices and shipping will be shown for your selected country.
            </p>
          </div>
        </DialogDescription>

        {showSearch && (
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country"
            className="border-border focus:border-foreground mb-6 w-full rounded-none border bg-transparent px-3 py-2 text-[13px] outline-none"
          />
        )}

        <div className="custom-scrollbar max-h-[50svh] overflow-y-auto">
          {filtered.map((country) => (
            <button
              key={country.id}
              onClick={() => handleSelect(country)}
              className="group border-border/50 hover:bg-muted/30 flex w-full items-center justify-between border-b p-3 text-left transition-colors last:border-0"
            >
              <div className="flex items-center space-x-1.5">
                <span>{country.flag_emoji}</span>
                <span className="text-[13px]">{country.name}</span>
              </div>
              <span className="text-muted-foreground text-[11px]">
                {country.currency_code}
              </span>
            </button>
          ))}

          {filtered.length === 0 && (
            <p className="text-muted-foreground py-6 text-center text-[13px]">
              No matching country.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
