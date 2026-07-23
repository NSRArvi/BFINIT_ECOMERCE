import useGetQuery from "@/hooks/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";

//TODO: delete this hook after replacing every where
export default function useGetOrders() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/orders/storeorders/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["orders", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
    staleTime: 2 * 60 * 1000,
  });
}
