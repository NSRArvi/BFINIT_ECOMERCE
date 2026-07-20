import { getApi } from "@/services-v2/api/getApi";
import { useQuery } from "@tanstack/react-query";

export default function useBaseGetQuery({
  endpoint = "",
  enabled = false,
  isTokenRequired = false,
  token = null,
  queryKey = [],
  ...options
}) {
  return useQuery({
    queryFn: () => getApi({ endpoint, token: isTokenRequired ? token : null }),
    enabled: enabled && !!endpoint,
    queryKey: [...queryKey],
    ...options,
  });
}
