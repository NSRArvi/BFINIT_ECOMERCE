import { BASE_URL } from "@/lib/api";

export const patchApi = async ({ endpoint, payload, token }) => {
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers,
    body: payload
      ? isFormData
        ? payload
        : JSON.stringify(payload)
      : undefined,
  });

  const data = await res.json();

  return data;
};
