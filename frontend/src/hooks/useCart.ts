import { useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = "cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setItems(stored ? JSON.parse(stored) : []);
  }, []);

  const save = (updated: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setItems(updated);
  };

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      const updated = exists
        ? prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { product, quantity: 1 }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.product.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const updated = prev.map((i) =>
        i.product.id === id ? { ...i, quantity } : i
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return { items, addToCart, removeFromCart, updateQuantity, total };
}