import { handleUnauthorized } from "@/lib/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const putApi = async (endpoint, token, clientId, payload) => {
  const isFormData = payload instanceof FormData; // check form data is raw json or new FormData();

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
  };

  const res = await fetch(baseUrl + endpoint, {
    method: "PUT",
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
