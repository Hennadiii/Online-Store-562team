import { useState, useEffect } from "react";
import { ProductDto } from "@/types/product";

export interface CartItem {
  product: ProductDto;
  quantity: number;
}

const STORAGE_KEY = "cart";
const CART_ID_KEY = "cartId";
const API_BASE = process.env.NEXT_PUBLIC_CART_API_URL ?? "http://localhost:9080";

// ── helpers ────────────────────────────────────────────────────────────────

async function fetchOrCreateCart(): Promise<number> {
  const stored = localStorage.getItem(CART_ID_KEY);
  if (stored) return Number(stored);

  const res = await fetch(`${API_BASE}/api/carts`, { method: "POST" });
  const data = await res.json();
  localStorage.setItem(CART_ID_KEY, String(data.cartId));
  return data.cartId;
}

// ── hook ───────────────────────────────────────────────────────────────────

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Загружаем корзину из localStorage при старте
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setItems(stored ? JSON.parse(stored) : []);
  }, []);

  const persist = (updated: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setItems(updated);
  };

  const addToCart = async (product: ProductDto) => {
    // 1. Обновляем UI сразу (оптимистично)
    const exists = items.find((i) => i.product.id === product.id);
    const updated = exists
      ? items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      : [...items, { product, quantity: 1 }];
    persist(updated);

    // 2. Синхронизируем с бэкендом
    try {
      const cartId = await fetchOrCreateCart();
      await fetch(`${API_BASE}/api/carts/${cartId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });
    } catch (err) {
      console.error("Cart sync failed:", err);
      // UI уже обновлён — не откатываем, просто логируем
    }
  };

  const removeFromCart = async (id: number) => {
    const updated = items.filter((i) => i.product.id !== id);
    persist(updated);

    try {
      const cartId = await fetchOrCreateCart();
      await fetch(`${API_BASE}/api/carts/${cartId}/items/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(id);
      return;
    }
    const updated = items.map((i) =>
      i.product.id === id ? { ...i, quantity } : i
    );
    persist(updated);

    try {
      const cartId = await fetchOrCreateCart();
      await fetch(`${API_BASE}/api/carts/${cartId}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity }),
      });
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

  const clearCart = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);

    try {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) {
        await fetch(`${API_BASE}/api/carts/${cartId}`, { method: "DELETE" });
        localStorage.removeItem(CART_ID_KEY);
      }
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return { items, addToCart, removeFromCart, updateQuantity, total, clearCart };
}