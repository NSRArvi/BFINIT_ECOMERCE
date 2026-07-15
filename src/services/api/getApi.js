import { BASE_URL } from "@/lib/api";
import { handleUnauthorized } from "@/lib/auth";

export const getApi = async (endpoint, token, clientId) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
  };

  const res = await fetch(BASE_URL + endpoint, { headers });

  // handleUnauthorized(res);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
