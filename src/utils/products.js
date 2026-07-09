export const getDiscountPercent = (price, discount) => {
  const priceNum = Number(price);
  const discountNum = Number(discount);

  if (!priceNum || !discountNum || discountNum >= priceNum) {
    return null;
  }

  const percent = ((priceNum - discountNum) / priceNum) * 100;

  return Math.round(percent);
};
