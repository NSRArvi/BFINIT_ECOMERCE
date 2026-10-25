import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useSetupStatus() {
  const { activeStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/api/v1/dashboard/stores/${activeStore?.id}/setup`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["setup-status", activeStore?.id],
  });
}
