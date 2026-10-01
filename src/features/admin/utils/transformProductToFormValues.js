import { getImgUrl } from "@/utils/getImgUrl";

function transformOptions(options) {
  return [...options]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((option) => ({
      id: String(option.id),
      name: option.name ?? "",
      values: [...option.values]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((v) => ({
          id: String(v.id),
          name: v.name,
        })),
    }));
}

function transformVariants(variants, options, rawOptions) {
  return (variants ?? []).map((v) => {
    const fallbackImage = rawOptions
      ?.map((opt) =>
        opt.values?.find(
          (val) => String(val.id) === String(v.optionValues?.[opt.id]),
        ),
      )
      .find((val) => val?.image)?.image;

    const image = v.image ?? fallbackImage;

    return {
      id: v.id,
      optionValues: Object.fromEntries(
        Object.entries(v.optionValues ?? {}).map(([k, val]) => [
          k,
          String(val),
        ]),
      ),
      labels: options
        .map((opt) => {
          const valueId = String(v.optionValues?.[opt.id]);
          return opt.values.find((val) => val.id === valueId)?.name;
        })
        .filter(Boolean)
        .join(" / "),
      sku: v.sku ?? "",
      price: v.price,
      discount_value: v.is_discount ? v.discount_value : undefined,
      stock: v.stock,
      image: image ? getImgUrl(image) : null,
      is_active: v.is_active ?? true,
      is_discount: v.is_discount ?? false,
    };
  });
}

function transformPricing(pricing) {
  const options = transformOptions(pricing?.options);

  return {
    country_id: pricing?.country_id,
    price: pricing?.price,
    discount_value: pricing?.is_discount ? pricing?.discount_value : undefined,
    stock: pricing?.stock,
    variants_enabled: pricing?.variants_enabled,
    use_default_pricing: pricing?.use_default_pricing,
    options: pricing?.options?.length > 0 ? options : [],
    variants:
      pricing?.variants?.length > 0
        ? transformVariants(pricing?.variants, options, pricing?.options)
        : [],
  };
}

export function transformProductToFormValues(product) {
  return {
    name: product?.name,
    category_id: product?.category_id,
    sub_category_id: product?.sub_category_id ?? undefined,
    brand_id: product?.brand_id ?? undefined,
    tags: product?.tags,
    short_description: product?.short_description ?? "",
    description: product?.description ?? "",
    is_hot_deal: product?.is_hot_deal,
    is_new_arrival: product?.is_new_arrival,
    is_featured: product?.is_featured,
    is_best_selling: product?.is_best_selling,
    is_flash_deal: false,
    flash_deal_start_date: null,
    flash_deal_end_date: null,
    image: getImgUrl(product?.image),
    images:
      product?.images?.length > 0
        ? product?.images?.map((img) => getImgUrl(img.image))
        : [],
    pricing: product?.countryPricing?.map(transformPricing),
  };
}
