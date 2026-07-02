const transformVariantsForPayload = (variants, startIndex) => {
  let imageIndex = startIndex;
  const imageFields = [];

  const transformedVariants = (variants ?? []).map((variant) => {
    const { image, ...rest } = variant;

    if (image instanceof File) {
      const currentIndex = imageIndex;
      imageFields.push({
        key: `optionValueImage_${currentIndex}`,
        file: image,
      });
      imageIndex += 1;
      return { ...rest, image_index: currentIndex };
    }

    return { ...rest, image_index: null };
  });

  return { transformedVariants, imageFields, nextIndex: imageIndex };
};

const transformPricing = (pricing, startIndex) => {
  let runningImageIndex = startIndex;
  const allImageFields = [];

  const transformedPricing = pricing.map((item) => {
    const { variants, discount_value, ...rest } = item;
    const { transformedVariants, imageFields, nextIndex } =
      transformVariantsForPayload(variants, runningImageIndex);

    runningImageIndex = nextIndex;
    allImageFields.push(...imageFields);

    return {
      ...rest,
      discount_value: discount_value || 0,
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
