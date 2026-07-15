export function resolveDefaultCountry(countries = [], defaultCountryId) {
  if (!countries?.length) return null;
  return countries.find((c) => c.id === defaultCountryId) ?? countries[0];
}
