import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCountry from "@/hooks/useCountry";
import useCart from "@/hooks/useCart";
import CurrencySwitchWarningModal from "@/components/storefront/modals/CurrencySwitchWarningModal";
import { cn } from "@/lib/utils";
import { resolveDefaultCountry } from "@/features/storefront/utils/country";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { useParams } from "react-router";

export default function CountrySwitcher({ className = "" }) {
  const { storeId } = useParams();
  const { selectedCountry, saveCountry } = useCountry();
  const { cartItems, clearCart } = useCart();

  const { data: storeData } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  const countries = storeData?.data?.countries;
  const defaultCountry = resolveDefaultCountry(
    countries,
    storeData?.data?.default_country_id,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [pendingCountry, setPendingCountry] = useState(null);

  const handleSwitchCurrency = (country) => {
    const currentId = selectedCountry?.id || defaultCountry?.id;
    if (country.id === currentId) return;

    if (cartItems?.length > 0) {
      setPendingCountry(country);
      setIsOpen(true);
      return;
    }

    saveCountry(country);
  };

  const handleConfirm = () => {
    saveCountry(pendingCountry);
    setPendingCountry(null);
    setIsOpen(false);
    clearCart();
  };

  const handleCancel = () => {
    setPendingCountry(null);
    setIsOpen(false);
  };

  if (countries?.length <= 1) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-9 items-center gap-1.5 px-2.5 text-xs", className)}
          >
            <span>{selectedCountry?.flag_emoji}</span>
            <span className="font-medium">
              {selectedCountry?.currency_code || defaultCountry?.currency_code}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {countries?.map((country) => {
            const isSelected = country.id === selectedCountry?.id;
            return (
              <DropdownMenuItem
                key={country.id}
                onClick={() => handleSwitchCurrency(country)}
                className={cn(
                  "flex cursor-pointer items-center justify-between text-sm",
                  isSelected && "bg-muted font-medium",
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{country.flag_emoji}</span>
                  <span>{country.name}</span>
                </span>
                <span className="text-muted-foreground text-xs">
                  {country.currency_code}
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <CurrencySwitchWarningModal
        isOpen={isOpen}
        pendingRegion={
          pendingCountry
            ? {
                name: pendingCountry.name,
                currency: pendingCountry.currency_code,
                currencyLabel: `${pendingCountry.currency_name} (${pendingCountry.currency_symbol})`,
              }
            : null
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
