import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import useCountry from "@/hooks/useCountry";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { getImgUrl } from "@/utils/getImgUrl";

export default function CountrySelector() {
  const { storeId } = useParams();
  const { saveCountry } = useCountry();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data: storeData, isLoading } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  const countries = storeData?.data?.countries || [];

  useEffect(() => {
    if (isLoading || !storeId) return;

    if (countries.length === 1) {
      saveCountry(countries[0]);
      setIsOpen(false);
      return;
    }

    if (countries.length > 1) {
      setIsOpen(true);
    }
  }, [isLoading, storeId, countries]);

  const handleSelect = (country) => {
    saveCountry(country);
    setIsOpen(false);
  };

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

  if (isLoading || !isOpen) return null;

  return (
    <div className="bg-background fixed inset-0 z-100 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl">
        {storeData?.data?.logo ? (
          <div className="mb-6 h-8 max-w-40">
            <img
              src={getImgUrl(storeData.data.logo)}
              alt={storeData.data.name}
              className="h-full w-auto object-contain object-left"
            />
          </div>
        ) : (
          <h1 className="mb-6 text-lg font-medium tracking-widest uppercase">
            {storeData.data.name}
          </h1>
        )}

        <div className="border-border/80 mb-7 border-t" />

        <p className="text-muted-foreground mb-3 text-[11px] font-medium tracking-widest uppercase">
          Select a country to preview pricing
        </p>
        <p className="text-muted-foreground mb-7 text-[13px] leading-6">
          Prices and shipping will be shown for your selected country.
        </p>

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
      </div>
    </div>
  );
}
