import { useParams } from "react-router";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "./useSelectedStore";

export default function useStoreSeo() {
  const { storeId } = useParams();
  const { activeStore } = useSelectedStore();

  const activeStoreId = storeId ?? activeStore?.id;

  return useGetQuery({
    endpoint: `/api/v1/general/seo-all/${activeStoreId}`,
    enabled: !!activeStoreId,
    queryKey: ["meta", activeStoreId],
  });
}
