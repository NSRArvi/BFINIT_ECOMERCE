import { BASE_URL } from "@/lib/api";
import { handleUnauthorized } from "@/lib/auth";

export const getApi = async ({ endpoint, token }) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });

  handleUnauthorized(res);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
