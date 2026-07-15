import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

//TODO: delete this component
export default function useGetStorePreference(storeId) {
  const { selectedStore } = useSelectedStore();

  const activeStoreId = storeId || selectedStore?.storeId;

  return useGetQuery({
    endpoint: `/store/preference/?storeId=${activeStoreId}`,
    queryKey: ["storePreference", activeStoreId],
    enabled: !!activeStoreId,
  });
}
