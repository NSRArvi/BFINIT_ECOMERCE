export function getTrialInfo(orderDetails = {}) {
  const isTrial = orderDetails.payment_method === "trial";
  const order = orderDetails.package_order;
  const start = order?.start_at ?? order?.created_at;
  const end = order?.expire_at;

  const expired =
    isTrial &&
    (order?.status === "expired" || (!!end && new Date(end) < new Date()));

  const totalDays =
    start && end
      ? Math.round((new Date(end) - new Date(start)) / 86400000)
      : null;

  return {
    isTrial,
    expired,
    start,
    end,
    totalDays,
    status: isTrial ? (expired ? "expired" : "active") : orderDetails.status,
  };
}
