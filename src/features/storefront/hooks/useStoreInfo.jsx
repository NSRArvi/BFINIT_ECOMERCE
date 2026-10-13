import { useParams } from "react-router";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function useStoreInfo() {
  const { storeId } = useParams();

  return useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });
}
