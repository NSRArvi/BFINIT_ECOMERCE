import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCountry from "@/hooks/useCountry";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function CountrySelectModal({ isEditing = false }) {
  const { storeId } = useParams();
  const { selectedCountry, saveCountry, setSelectedCountry } = useCountry();

  const [isOpen, setIsOpen] = useState(true);

  const { data: storeData, isLoading } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  const countries = storeData?.data?.countries || [];

  useEffect(() => {
    if (!isEditing) {
      const savedCountry = localStorage.getItem(`store_${storeId}_country`);
      if (savedCountry) {
        setIsOpen(false);
        saveCountry(JSON.parse(savedCountry));
        return;
      }
      if (countries.length === 1) {
        setIsOpen(false);
        const country = countries[0];
        saveCountry(country);
        localStorage.setItem(
          `store_${storeId}_country`,
          JSON.stringify(country),
        );
        return;
      }
      if (countries.length > 1) {
        setIsOpen(true);
      }
    }

    if (isEditing && countries.length === 1) {
      const country = countries[0];
      setSelectedCountry(country);
      setIsOpen(false);
    }
  }, [isEditing, countries, storeId]);

  const handleCountrySelect = (country) => {
    if (!isEditing) {
      saveCountry(country);
    } else {
      setSelectedCountry(country);
    }
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    if (!open && !selectedCountry) return;
    setIsOpen(false);
  };

  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-foreground/50 flex h-screen max-h-screen w-screen max-w-full! items-center justify-center rounded-none border-0 p-0 shadow-none backdrop-blur-sm [&>button]:hidden"
      >
        <div className="bg-background relative flex max-h-[90svh] w-full max-w-xl flex-col shadow-2xl">
          {/* Fixed header */}
          <div className="px-8 pt-8 pb-7 sm:px-10 sm:pt-10">
            <h1 className="text-foreground mb-6 text-lg font-medium tracking-widest uppercase">
              {storeData?.data?.name}
            </h1>
            <div className="border-border/80 mb-7 border-t" />
            <p className="text-muted-foreground mb-3 text-[11px] font-medium tracking-widest uppercase">
              Select a country to preview pricing
            </p>
            <p className="text-muted-foreground text-[13px] leading-6">
              Your store's theme applies to all countries. This selection only
              affects which country's product prices appear in the preview.
            </p>
          </div>

          {/* Scrollable country list */}
          <div className="custom-scrollbar overflow-y-auto px-8 pb-8 sm:px-10 sm:pb-10">
            <div>
              {storeData?.data?.countries?.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country)}
                  className="group border-border/50 hover:bg-muted/30 flex w-full items-center justify-between border-b p-3 transition-colors last:border-0"
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
