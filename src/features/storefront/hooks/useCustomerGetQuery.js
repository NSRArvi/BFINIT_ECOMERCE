import useBaseGetQuery from "@/hooks-v2/api/useBaseGetQuery";
import useCustomerAuth from "./useCustomerAuth";

export default function useCustomerGetQuery({
  endpoint = "",
  enabled = false,
  isTokenRequired = false,
  queryKey = [],
  ...options
}) {
  const { token } = useCustomerAuth();

  return useBaseGetQuery({
    endpoint,
    enabled,
    isTokenRequired,
    token,
    queryKey,
    ...options,
  });
}
