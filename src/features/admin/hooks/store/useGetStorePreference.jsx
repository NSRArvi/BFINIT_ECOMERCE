import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

//TODO: delete this component
export default function useGetStorePreference(storeId) {
  const { selectedStore } = useSelectedStore();

  const activeStoreId = storeId || selectedStore?.storeId;

  return useGetQuery({
    endpoint: `/store/preference/?storeId=${activeStoreId}`,
    enabled: !!activeStoreId,
    queryKey: ["storePreference", activeStoreId],
  });
}
