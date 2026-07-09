export const getCategoryFromTemplateId = (templateId) => {
  if (templateId.startsWith("nav")) return "header";
  if (templateId.startsWith("announce-bar")) return "header";
  if (templateId.startsWith("hero")) return "body";
  if (templateId.startsWith("product")) return "body";
  if (templateId.startsWith("testimonials")) return "body";
  if (templateId.startsWith("footer")) return "footer";
  return "body";
};

export const getSectionType = (templateId) => {
  if (templateId.startsWith("nav")) return "navbar";
  if (templateId.startsWith("announce-bar")) return "announcebar";
  if (templateId.startsWith("hero")) return "hero";
  if (templateId.startsWith("footer")) return "footer";
  return null; // null means multiple instances allowed
};
