import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CustomerAuthContext } from "../context/CustomerAuthContext";

export default function CustomerAuthProvider({ children }) {
  const { storeId } = useParams();

  const [customer, setCustomer] = useState(() => {
    try {
      const customerAuthInfo = localStorage.getItem(`customer_auth_${storeId}`);
      return customerAuthInfo ? JSON.parse(customerAuthInfo) : null;
    } catch (error) {
      console.error("Error parsing customerAuthInfo from localStorage:", error);
      localStorage.removeItem(`customer_auth_${storeId}`);
      return null;
    }
  });

  const token = customer?.token ?? null;
  const customerData = customer?.user ?? null;

  const saveAuthInfo = (authInfo) => {
    setCustomer(authInfo);
    localStorage.setItem(`customer_auth_${storeId}`, JSON.stringify(authInfo));
  };

  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem(`customer_auth_${storeId}`);
  };

  useEffect(() => {
    if (customer) {
      localStorage.setItem(
        `customer_auth_${storeId}`,
        JSON.stringify(customer),
      );
    } else {
      localStorage.removeItem(`customer_auth_${storeId}`);
    }
  }, [customer, storeId]);

  const authInfo = {
    customer,
    customerData,
    token,
    saveAuthInfo,
    handleLogout,
  };

  return (
    <CustomerAuthContext.Provider value={authInfo}>
      {children}
    </CustomerAuthContext.Provider>
  );
}
