import { getImgUrl } from "@/utils/getImgUrl";

const transformVariantsForPayload = (variants, startIndex, defaultPricing) => {
  const imageFields = [];

  const transformedVariants = (variants ?? []).map((variant, i) => {
    const variantIndex = startIndex + i;
    const { image, price, discount_value, is_discount, ...rest } = variant;

    const finalPrice = defaultPricing.use_default_pricing
      ? defaultPricing.price
      : price;
    const finalDiscount = defaultPricing.use_default_pricing
      ? defaultPricing.discount_value
      : discount_value;
    const finalIsDiscount = finalDiscount > 0;

    const variantPricing = {
      price: finalPrice,
      discount_value: finalDiscount,
      is_discount: finalIsDiscount,
      ...rest,
    };

    if (image instanceof File) {
      imageFields.push({
        key: `combinationImage_${variantIndex}`,
        file: image,
      });

      return {
        ...variantPricing,
        image_index: variantIndex,
      };
    }

    return {
      ...variantPricing,
      image_index: null,
    };
  });

  return {
    transformedVariants,
    imageFields,
    nextIndex: startIndex + transformedVariants.length,
  };
};

const transformPricing = (pricing, startIndex) => {
  let runningImageIndex = startIndex;
  const allImageFields = [];

  const transformedPricing = pricing.map((item) => {
    const {
      variants,
      variants_enabled,
      options,
      discount_value,
      price,
      use_default_pricing,
      ...rest
    } = item;

    const hasVariants = variants_enabled && variants?.length > 0;

    const defaultPricing = { price, discount_value, use_default_pricing };

    const { transformedVariants, imageFields, nextIndex } =
      transformVariantsForPayload(
        hasVariants ? variants : [],
        runningImageIndex,
        defaultPricing,
      );

    runningImageIndex = nextIndex;
    allImageFields.push(...imageFields);

    return {
      ...rest,
      variants_enabled: hasVariants,
      options: hasVariants ? options : [],
      price,
      discount_value: discount_value || 0,
      is_discount: discount_value > 0,
      variants: transformedVariants,
    };
  });

  return { transformedPricing, allImageFields };
};

export const buildProductPayload = (data, storeId) => {
  const {
    name,
    category_id,
    sub_category_id,
    brand_id,
    image,
    images,
    description,
    short_description,
    pricing,
    tags,
    is_hot_deal,
    is_new_arrival,
    is_featured,
    is_best_selling,
    is_flash_deal,
  } = data;

  const formData = new FormData();

  formData.append("store_id", storeId);
  formData.append("name", name);
  formData.append("category_id", category_id);
  formData.append("is_hot_deal", is_hot_deal);
  formData.append("is_new_arrival", is_new_arrival);
  formData.append("is_featured", is_featured);
  formData.append("is_best_selling", is_best_selling);
  formData.append("is_flash_deal", is_flash_deal);

  const { transformedPricing, allImageFields } = transformPricing(pricing, 0);
  formData.append("country_pricing", JSON.stringify(transformedPricing));

  formData.append("image", image);
  images?.forEach((file) => formData.append("images", file));
  allImageFields.forEach(({ key, file }) => formData.append(key, file));

  if (sub_category_id) formData.append("sub_category_id", sub_category_id);
  if (brand_id) formData.append("brand_id", brand_id);
  if (description) formData.append("description", description);
  if (short_description)
    formData.append("short_description", short_description);
  if (tags?.length > 0) formData.append("tags", JSON.stringify(tags));

  return formData;
};

const getRemovedImageIds = (images = [], productDetails) => {
  const keptImgUrls = new Set(images?.filter((img) => typeof img === "string"));

  return (productDetails?.images ?? [])
    .filter((img) => !keptImgUrls.has(getImgUrl(img.image)))
    .map((img) => img.id);
};

const getRemovedCountryPricingIds = (pricing = [], productDetails) => {
  const keptIds = new Set(pricing.map((p) => p.id).filter(Boolean));

  return (productDetails?.countryPricing ?? [])
    .filter((p) => !keptIds.has(p.id))
    .map((p) => p.id);
};

const getRemovedVariantImageIds = (pricing = [], productDetails) => {
  const removed = [];

  (productDetails?.countryPricing ?? []).forEach((origCp) => {
    const current = pricing.find((p) => p.id === origCp.id);
    if (!current) return;

    origCp.variants?.forEach((ov) => {
      if (!ov.image) return;

      const cv = current.variants?.find((v) => v.id === ov.id);
      if (!cv) return;

      if (!cv.image) removed.push(ov.id);
    });
  });

  return removed;
};

export const buildProductUpdatePayload = (data, storeId, productDetails) => {
  const {
    name,
    category_id,
    sub_category_id,
    brand_id,
    image,
    images,
    description,
    short_description,
    pricing,
    tags,
    is_hot_deal,
    is_new_arrival,
    is_featured,
    is_best_selling,
    is_flash_deal,
  } = data;

  const formData = new FormData();

  formData.append("store_id", storeId);
  formData.append("name", name);
  formData.append("category_id", category_id);
  formData.append("sub_category_id", sub_category_id ?? "");
  formData.append("brand_id", brand_id ?? "");
  formData.append("is_hot_deal", is_hot_deal);
  formData.append("is_new_arrival", is_new_arrival);
  formData.append("is_featured", is_featured);
  formData.append("is_best_selling", is_best_selling);
  formData.append("is_flash_deal", is_flash_deal);
  formData.append("short_description", short_description ?? "");
  formData.append("description", description ?? "");
  formData.append("tags", JSON.stringify(tags ?? []));

  if (image instanceof File) formData.append("image", image);

  images?.forEach(
    (img) => img instanceof File && formData.append("images", img),
  );

  formData.append(
    "deleted_gallery_image_ids",
    JSON.stringify(getRemovedImageIds(images, productDetails)),
  );

  formData.append(
    "deleted_country_pricing_ids",
    JSON.stringify(getRemovedCountryPricingIds(pricing, productDetails)),
  );

  formData.append(
    "remove_combination_image_ids",
    JSON.stringify(getRemovedVariantImageIds(pricing, productDetails)),
  );

  const { transformedPricing, allImageFields } = transformPricing(pricing, 0);
  formData.append("country_pricing", JSON.stringify(transformedPricing));

  allImageFields.forEach(({ key, file }) => formData.append(key, file));

  return formData;
};
