export function transformZoneToFormValues(zone) {
  return {
    name: zone.name,
    country_id: zone.country_id,
    zone_type: zone.zone_type,
    priority: String(zone.priority),
    is_active: zone.is_active,
    is_default: zone.is_default,
    locations: zone.locations.map((loc) => ({
      state: loc.state ?? "",
      city: loc.city ?? "",
      postal_code: loc.postal_code ?? "",
      postal_code_from: loc.postal_code_from ?? "",
      postal_code_to: loc.postal_code_to ?? "",
    })),
    rates: zone.rates.map((rate) => ({
      name: rate.name,
      fee_type: rate.fee_type,
      base_fee: String(rate.base_fee),
      free_delivery_min_order:
        rate.free_delivery_min_order != null
          ? String(rate.free_delivery_min_order)
          : "",
      min_weight: rate.min_weight != null ? String(rate.min_weight) : "",
      max_weight: rate.max_weight != null ? String(rate.max_weight) : "",
      extra_fee_per_kg:
        rate.extra_fee_per_kg != null ? String(rate.extra_fee_per_kg) : "",
      estimated_min_days: String(rate.estimated_min_days),
      estimated_max_days: String(rate.estimated_max_days),
      is_active: rate.is_active,
    })),
  };
}
