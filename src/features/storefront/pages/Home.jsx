import { useParams } from "react-router";
import SectionRenderer from "@/components/theme-renderer/SectionRenderer";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useCountry from "@/hooks/useCountry";

export default function Home() {
  const { storeId } = useParams();
  const { selectedCountry } = useCountry();

  const { data } = useGetQuery({
    endpoint: `/api/v1/themes/storeTheme/getThemeForStore/${storeId}`,
    enabled: !!storeId && !!selectedCountry,
    queryKey: ["sections", storeId],
  });

  return <SectionRenderer sections={data?.data?.theme_configuration?.body} />;
}
