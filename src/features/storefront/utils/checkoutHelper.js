export const buildCheckoutPayload = ({
  data,
  storeId,
  countryId,
  currency,
  userId,
  cartItems,
  subTotalAmount,
  deliveryFee,
  selectedDeliveryCharge,
}) => {
  const formData = new FormData();

  formData.append("user_id", userId);
  formData.append("store_id", storeId);
  formData.append("country_id", countryId);
  formData.append("currency", currency);
  formData.append("sub_total", subTotalAmount);
  formData.append("total_amount", subTotalAmount + deliveryFee);
  formData.append("delivery_zone_id", selectedDeliveryCharge?.zone_id ?? "");
  formData.append(
    "delivery_zone_rate_id",
    selectedDeliveryCharge?.rate_id ?? "",
  );
  formData.append(
    "payment_type",
    data.payment_method === "bank_payment" || data.payment_method === "cod"
      ? "offline"
      : "online",
  );

  formData.append(
    "items",
    JSON.stringify(
      cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        ...(item.variantId && {
          product_variant_combination_id: item.variantId,
        }),
      })),
    ),
  );

  Object.entries(data).forEach(([key, value]) => {
    if (key === "transaction_proof") return;
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  if (data.transaction_proof instanceof File) {
    formData.append("transaction_proof", data.transaction_proof);
  }

  return formData;
};
