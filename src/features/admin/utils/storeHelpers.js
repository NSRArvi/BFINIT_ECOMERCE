const generatePublicSubdomain = (name) => {
  const slug =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "store";

  return `${slug}-${Math.random().toString(36).slice(2, 7)}`;
};

const generateStoreCode = (name) => {
  const prefix =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 4) || "str";
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
};

export const createStorePayload = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("public_subdomain", generatePublicSubdomain(data.name)); // TODO: generate via backend
  formData.append("store_code", generateStoreCode(data.name)); // TODO: generate via backend
  formData.append("default_country_id", data.default_country_id);
  formData.append("contact_email", data.email);
  formData.append("contact_phone", data.mobile);
  formData.append("default_country_address", data.default_country_address);

  data.countries.forEach((country) => {
    formData.append("country_ids", country.id);
  });

  if (data?.logo?.file) {
    formData.append("logo", data.logo.file);
  }

  if (data?.favicon?.file) {
    formData.append("favicon", data.favicon.file);
  }

  if (data?.telephone) {
    formData.append("contact_telephone", data.telephone);
  }

  formData.append("is_active", data.is_active);

  return formData;
};

export const createSocialMediaPayload = (data, storeId) => {
  const { facebook, instagram, x, youtube, tiktok, pinterest } = data;

  return {
    store_id: storeId,
    facebook,
    instagram,
    x,
    youtube,
    tiktok,
    pinterest,
  };
};
