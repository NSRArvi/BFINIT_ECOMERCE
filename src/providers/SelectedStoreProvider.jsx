import { useCallback, useState } from "react";
import { StoreContext } from "@/context/StoreContext";

const storeStorageKey = "activeStore";

export default function SelectedStoreProvider({ children }) {
  const [activeStore, setActiveStore] = useState(() => {
    const stored = localStorage.getItem(storeStorageKey);
    return stored ? JSON.parse(stored) : null;
  });

  const selectStore = useCallback((store) => {
    const { id, name, logo, public_subdomain } = store;
    const storeData = { id, name, logo, public_subdomain };
    setActiveStore(storeData);
    localStorage.setItem(storeStorageKey, JSON.stringify(storeData));
  }, []);

  const clearStore = () => {
    setActiveStore(null);
    localStorage.removeItem(storeStorageKey);
  };

  const value = {
    activeStore,
    selectStore,
    clearStore,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
