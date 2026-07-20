import useBasePostMutation from "@/hooks-v2/api/useBasePostMutation";
import useCustomerAuth from "./useCustomerAuth";

export default function useCustomerPostMutation({
  endpoint = "",
  isTokenRequired = false,
  ...options
}) {
  const { token } = useCustomerAuth();

  return useBasePostMutation({
    endpoint,
    isTokenRequired,
    token,
    ...options,
  });
}
