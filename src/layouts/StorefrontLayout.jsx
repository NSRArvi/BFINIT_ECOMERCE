import { useEffect } from "react";
import { Outlet, ScrollRestoration, useParams } from "react-router";
import StorefrontLoader from "@/components/storefront/loader/StorefrontLoader";
import useGetStoreMeta from "@/hooks/useGetStoreMeta";
import { updateStoreMeta } from "@/utils/meta";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import SectionRenderer from "@/components/theme-renderer/config/SectionRenderer";
import useCountry from "@/hooks/useCountry";
import CountrySelector from "@/features/storefront/components/CountrySelector";
import StoreUnavailable from "@/features/storefront/pages/StoreUnavailable";

export default function StorefrontLayout() {
  const { storeId } = useParams();
  const { selectedCountry } = useCountry();

  const { data: storeStatus, isLoading: isStoreStatusLoading } = useGetQuery({
    endpoint: `/api/v1/package-order/last-package-active/${storeId}`,
    enabled: !!storeId,
    queryKey: ["storeStatus", storeId],
  });

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/themes/storeTheme/getThemeForStore/${storeId}`,
    enabled: !!storeId && !!selectedCountry,
    queryKey: ["sections", storeId],
  });

  /* const { data: storeMeta, isLoading: isMetaLoading } =
    useGetStoreMeta(storeId);

  useEffect(() => {
    if (storeMeta?.data?.length > 0) {
      updateStoreMeta(storeMeta?.data?.[0]);
    }
  }, [storeMeta]); */

  if (isLoading || isStoreStatusLoading) return <StorefrontLoader />;

  if (storeStatus?.data?.is_expired) {
    return <StoreUnavailable />;
  }

  return (
    <main>
      {!selectedCountry ? (
        <CountrySelector />
      ) : (
        <>
          <header className="sticky top-0 z-50">
            <SectionRenderer
              sections={data?.data?.theme_configuration?.header}
            />
          </header>
          <Outlet />
          <footer>
            <SectionRenderer
              sections={data?.data?.theme_configuration?.footer}
            />
          </footer>
          <ScrollRestoration />
        </>
      )}
    </main>
  );
}
