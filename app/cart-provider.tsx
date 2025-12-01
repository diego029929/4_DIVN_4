"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  productId: string;
  name: string;
  priceInCents: number;
  quantity: number;
  size?: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false); // ✅ Hydratation côté client

  // Charger le panier depuis localStorage côté client seulement
  useEffect(() => {
    const saved = localStorage.getItem("divn-cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setIsMounted(true);
  }, []);

  // Sauvegarder les changements dans localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("divn-cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0);

  // Ne rien rendre avant que le provider soit monté pour éviter les erreurs SSR
  if (!isMounted) return <>{children}</>;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
  }
        
