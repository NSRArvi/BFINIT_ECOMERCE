import { useContext } from "react";
import { CustomerAuthContext } from "../context/CustomerAuthContext";

export default function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);

  if (context === null) {
    return {};
  }

  return context;
}
