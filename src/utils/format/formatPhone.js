export const formatPhone = (countryCode, phone) => {
  if (!phone) return "—";
  return phone.trim().startsWith("+") ? phone : `${countryCode} ${phone}`;
};
