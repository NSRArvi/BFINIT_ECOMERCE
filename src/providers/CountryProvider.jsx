import { CountryContext } from "@/context/CountryContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function CountryProvider({ children }) {
  const { storeId } = useParams();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;

    const savedCountry = localStorage.getItem(`store_${storeId}_country`);

    if (savedCountry) {
      try {
        setSelectedCountry(JSON.parse(savedCountry));
      } catch (error) {
        console.error("Failed to parse saved country:", error);
      }
    }

    setIsLoading(false);
  }, [storeId]);

  const saveCountry = (country) => {
    setSelectedCountry(country);
    localStorage.setItem(`store_${storeId}_country`, JSON.stringify(country));
  };

  const clearCountry = () => {
    setSelectedCountry(null);
    localStorage.removeItem(`store_${storeId}_country`);
  };

  const value = {
    selectedCountry,
    saveCountry,
    clearCountry,
    isLoading,
    setSelectedCountry,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
}
