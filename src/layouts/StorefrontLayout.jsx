import { useEffect } from "react";
import { Outlet, ScrollRestoration, useParams } from "react-router";
import StorefrontLoader from "@/components/storefront/loader/StorefrontLoader";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import useGetStoreMeta from "@/hooks/useGetStoreMeta";
import useTheme from "@/hooks/useTheme";
import { updateStoreMeta } from "@/utils/meta";
import CountrySelectModal from "@/components/storefront/modals/CountrySelectModal";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";

export default function StorefrontLayout() {
  const { storeId } = useParams();
  const { isLoading: isThemeLoading } = useThemeEditor();
  const { data: storeMeta, isLoading: isMetaLoading } =
    useGetStoreMeta(storeId);

  useEffect(() => {
    if (storeMeta?.data?.length > 0) {
      updateStoreMeta(storeMeta?.data?.[0]);
    }
  }, [storeMeta]);

  if (isThemeLoading || isMetaLoading) return <StorefrontLoader />;

  return (
    <main>
      <CountrySelectModal />
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </main>
  );
}
