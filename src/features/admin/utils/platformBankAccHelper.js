export const emptyDefaults = {
  country: "",
  bank_name: "",
  account_name: "",
  account_number: "",
  iban: "",
  swift_code: "",
  routing_number: "",
  is_active: true,
};

export const transformPlatformBankData = (data) => {
  return {
    country: data?.country,
    bank_name: data?.bank_name,
    account_name: data?.account_name,
    account_number: data?.account_number,
    iban: data?.iban,
    swift_code: data?.swift_code,
    routing_number: data?.routing_number,
    is_active: data?.is_active,
  };
};
