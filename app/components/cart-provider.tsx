"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/app/lib/product";

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("divn-cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("divn-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, size?: string) => {
    setItems((prev) => {
      const index = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size
      );

      if (index !== -1) {
        const copy = [...prev];
        copy[index].quantity += 1;
        return copy;
      }

      return [...prev, { product, quantity: 1, size }];
    });
  };

  const removeItem = (productId: string, size?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.size === size)
      )
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
