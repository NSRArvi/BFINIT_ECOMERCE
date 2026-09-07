import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function usePackageUsage() {
  return useGetQuery({
    endpoint: "/api/v1/package-order/usage",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["admin", "usage"],
  });
}
