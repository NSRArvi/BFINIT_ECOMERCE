const DEFAULT_STATUS = {
  delivered: 0,
  shipped: 0,
  pending: 0,
  returned: 0,
};

export const getOrderStatus = (status = DEFAULT_STATUS) => [
  {
    title: "Delivered",
    color: "success",
    count: status?.delivered,
  },
  {
    title: "Shipped",
    color: "info",
    count: status?.shipped,
  },
  {
    title: "Pending",
    color: "warning",
    count: status?.pending,
  },
  {
    title: "Returned",
    color: "destructive",
    count: status?.returned,
  },
];
