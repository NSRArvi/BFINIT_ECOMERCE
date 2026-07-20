import { useContext } from "react";
import { CartContext } from "@/features/storefront/context/CartContext";

export default function useCart() {
  return useContext(CartContext);
}
