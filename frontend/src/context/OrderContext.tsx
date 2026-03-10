"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order } from "@/@types/order";
import { fetchOrder } from "@/services/orderService";

const STORAGE_KEY = "order_ids";

interface OrderContextType {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // ── При старті — завантажуємо збережені ID з localStorage ─────────────────
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const ids: string[] = raw ? JSON.parse(raw) : [];
        if (ids.length === 0) {
          setLoading(false);
          return;
        }

        const results = await Promise.all(ids.map((id) => fetchOrder(id)));
        const loaded = results.filter((o): o is Order => o !== null);
        setOrders(loaded);
      } catch {
        // localStorage або fetch недоступні
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // ── Додати новий заказ ─────────────────────────────────────────────────────
  const addOrder = (newOrder: Order) => {
    setOrder(newOrder);
    setOrders((prev) => {
      const updated = [newOrder, ...prev.filter((o) => o.id !== newOrder.id)];

      // Зберігаємо ID в localStorage
      try {
        const ids = updated.map((o) => o.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      } catch {}

      return updated;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, order, loading, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrderContext must be used within OrderProvider");
  return ctx;
};