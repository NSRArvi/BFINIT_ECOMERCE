import { getImgUrl } from "./getImgUrl";

export const updateStoreSeo = (seo, store) => {
  let metaDescription = document.querySelector('meta[name="description"]');
  const favicon = document.querySelector("link[rel~='icon']");

  document.title = seo.title || store?.name || "Online Store";

  if (seo?.description) {
    metaDescription.setAttribute("content", seo.description);
  } else {
    metaDescription.remove();
  }

  if (favicon) {
    favicon.href = getImgUrl(store?.favicon) || "/favicon.ico";
  }
};
