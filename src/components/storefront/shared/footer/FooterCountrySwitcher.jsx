import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCart from "@/hooks/useCart";
import useCountry from "@/hooks/useCountry";
import { useState } from "react";
import CurrencySwitchWarningModal from "../../modals/CurrencySwitchWarningModal";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { useParams } from "react-router";
import { resolveDefaultCountry } from "@/features/storefront/utils/country";

export default function FooterCountrySwitcher() {
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
        <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors outline-none">
          <span>
            {selectedCountry?.flag_emoji || defaultCountry?.flag_emoji}
          </span>
          <span className="text-xs">
            {selectedCountry?.currency_code || defaultCountry?.currency_code}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {countries?.map((country) => (
            <DropdownMenuItem
              key={country.id}
              onClick={() => handleSwitchCurrency(country)}
              className="flex cursor-pointer items-center justify-between"
            >
              <span className="flex items-center gap-2 text-sm">
                <span>{country.flag_emoji}</span>
                <span>{country.name}</span>
              </span>
              <span className="text-muted-foreground text-xs">
                {country.currency_code}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <CurrencySwitchWarningModal
        isOpen={isOpen}
        pendingRegion={
          pendingCountry
            ? {
                name: pendingCountry.country_name,
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
