import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "./useSelectedStore";

export default function useGetStoreMeta(storeId) {
  const { selectedStore } = useSelectedStore();
  const activeStoreId = storeId || selectedStore?.storeId;

  return useGetQuery({
    endpoint: `/meta/store/?storeId=${storeId}`,
    queryKey: ["storeMeta", activeStoreId],
    enabled: !!activeStoreId,
  });
}
