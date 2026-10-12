import usePackageInfo from "./usePackageInfo";

export default function useSubscription() {
  const { data, isLoading } = usePackageInfo();

  const isTrial =
    data?.data?.package_upgrade?.package?.package_type_label?.toLowerCase() ===
    "trial";
  const isExpired = data?.data?.package_order?.status === "expired";

  const expiredAt = data?.data?.package_order?.expire_at;
  const reason = isTrial ? "trial" : "expired";

  return { expiredAt, reason, isExpired, isLoading };
}
