export const getCurrencySymbol = (storePreference) => {
  // New multi-country format
  if (storePreference?.countries && Array.isArray(storePreference.countries)) {
    const defaultCountry = storePreference.countries.find(
      (country) => country?.isDefault,
    );
    return defaultCountry?.currency_symbol || "$";
  }

  // Old single-country format (backward compatible)
  if (storePreference?.data?.currencySymbol) {
    return storePreference.data.currencySymbol;
  }

  // Direct field (some API responses)
  if (storePreference?.currencySymbol) {
    return storePreference.currencySymbol;
  }

  // Default fallback
  return "$";
};

export const getCurrencyCode = (storePreference) => {
  // New multi-country format
  if (storePreference?.countries && Array.isArray(storePreference.countries)) {
    const defaultCountry = storePreference.countries.find(
      (country) => country?.isDefault,
    );
    return defaultCountry?.currency_code || "USD";
  }

  // Old format
  if (storePreference?.data?.currencyCode) {
    return storePreference.data.currencyCode;
  }

  if (storePreference?.currencyCode) {
    return storePreference.currencyCode;
  }

  return "USD";
};
