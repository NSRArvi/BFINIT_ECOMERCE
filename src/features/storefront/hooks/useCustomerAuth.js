import { useContext } from "react";
import { CustomerAuthContext } from "../context/CustomerAuthContext";

export default function useCustomerAuth() {
  return useContext(CustomerAuthContext);
}
