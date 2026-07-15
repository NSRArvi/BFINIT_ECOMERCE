import { BASE_URL } from "@/lib/api";
import { handleUnauthorized } from "@/lib/auth";

export const postApi = async (
  endpoint,
  token,
  clientId,
  customerId,
  storeId,
  payload,
) => {
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
    ...(customerId && { customerid: customerId }),
    ...(storeId && { storeid: storeId }),
  };

  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
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
