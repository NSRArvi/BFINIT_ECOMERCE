import useAuth from "@/hooks/auth/useAuth";
import useBasePostMutation from "./useBasePostMutation";

export default function usePostMutation({
  endpoint = "",
  isTokenRequired = false,
  ...options
}) {
  const { token } = useAuth();

  return useBasePostMutation({
    endpoint,
    isTokenRequired,
    token,
    ...options,
  });
}
