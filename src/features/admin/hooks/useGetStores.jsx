import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function useGetStores() {
  const { token, user } = useAuth();

  return useGetQuery({
    endpoint: "/api/v1/store",
    enabled: !!token,
    isTokenRequired: true,
    queryKey: ["stores", user?.data?.user?.id],
  });
}
