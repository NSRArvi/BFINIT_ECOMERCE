import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/services-v2/api/postApi";

export default function useBasePostMutation({
  endpoint = "",
  isTokenRequired = false,
  token = null,
  ...options
}) {
  return useMutation({
    mutationFn: (payload) =>
      postApi({ endpoint, payload, token: isTokenRequired ? token : null }),
    ...options,
  });
}
