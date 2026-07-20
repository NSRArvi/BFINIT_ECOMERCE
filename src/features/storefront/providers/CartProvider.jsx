import { useState, useEffect } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import useCountry from "@/hooks/useCountry";
import { CartContext } from "../context/CartContext";

export default function CartProvider({ children }) {
  const { storeId } = useParams();
  const { selectedCountry } = useCountry();

  const [cartItems, setCartItems] = useState([]);
  const totalItems = cartItems?.length || 0;

  const originalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const subTotalAmount = cartItems.reduce((total, item) => {
    const price = item.discount_value > 0 ? item.discount_value : item.price;
    return total + price * item.quantity;
  }, 0);

  const totalSavingsAmount = originalAmount - subTotalAmount;

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(
      `cart_${storeId}_${selectedCountry?.id}`,
    );
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, [storeId, selectedCountry]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(
        `cart_${storeId}_${selectedCountry?.id}`,
        JSON.stringify(cartItems),
      );
    } else {
      localStorage.removeItem(`cart_${storeId}_${selectedCountry?.id}`);
    }
  }, [cartItems, storeId, selectedCountry]);

  const addToCart = (product = {}, quantity = 1, variantInfo = {}) => {
    const isVariant = Boolean(variantInfo?.id);
    const maxQuantity = isVariant
      ? variantInfo.stock
      : product.countryPricing.stock;

    const existingItem = cartItems.find((item) =>
      isVariant
        ? item.id === product.id && item.variantId === variantInfo.id
        : item.id === product.id && !item.variantId,
    );

    if (existingItem) {
      const requestedQuantity = existingItem.quantity + quantity;
      const newQuantity = Math.min(requestedQuantity, maxQuantity);

      if (newQuantity === existingItem.quantity) {
        toast.error(
          `Only ${maxQuantity} in stock — you already have the max in your cart.`,
        );
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item === existingItem ? { ...item, quantity: newQuantity } : item,
        ),
      );

      if (newQuantity < requestedQuantity) {
        toast.warning(`Only ${maxQuantity} in stock - quantity adjusted.`);
      } else {
        toast.success(`${product.name} quantity updated in cart.`);
      }
      return;
    }

    const clampedQuantity = Math.min(quantity, maxQuantity);

    const cartItem = isVariant
      ? {
          id: product.id,
          variantId: variantInfo.id,
          name: product.name,
          image: product.image,
          price: variantInfo.price,
          quantity: clampedQuantity,
          stock: variantInfo.stock,
          ...(variantInfo.is_discount && {
            discount_value: variantInfo.discount_value,
          }),
          optionLabels: variantInfo.optionLabels,
        }
      : {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.countryPricing.price,
          quantity: clampedQuantity,
          stock: product.countryPricing.stock,
          ...(product.countryPricing.is_discount && {
            discount_value: product.countryPricing.discount_value,
          }),
        };

    setCartItems((prevItems) => [...prevItems, cartItem]);

    if (clampedQuantity < quantity) {
      toast.warning(
        `Only ${maxQuantity} in stock - added ${clampedQuantity} instead of ${quantity}.`,
      );
    } else {
      toast.success(`${product.name} added to cart.`);
    }
  };

  const updateItemQuantity = (id, variantId, action) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id && item.variantId === variantId) {
        return {
          ...item,
          quantity:
            action === "increment" ? item.quantity + 1 : item.quantity - 1,
        };
      }
      return item;
    });

    setCartItems(updatedItems);
  };

  const removeItem = (id, variantId) => {
    const filteredItems = cartItems.filter(
      (item) => !(item.id === id && item.variantId === variantId),
    );
    setCartItems(filteredItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    totalItems,
    originalAmount,
    subTotalAmount,
    totalSavingsAmount,
    addToCart,
    updateItemQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
