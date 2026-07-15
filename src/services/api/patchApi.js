import { BASE_URL } from "@/lib/api";
import { handleUnauthorized } from "@/lib/auth";

export const patchApi = async (endpoint, token, clientId, payload) => {
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
  };

  const res = await fetch(BASE_URL + endpoint, {
    method: "PATCH",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  });

  // handleUnauthorized(res);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.response = data;
    throw error;
  }

  return data;
};
