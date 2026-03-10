"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order } from "@/@types/order";
import { fetchOrder } from "@/services/orderService";

const STORAGE_KEY = "orders_data";

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

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setLoading(false);
          return;
        }

        const cached: Order[] = JSON.parse(raw);

        // Одразу показуємо кешовані дані (з image/title/price)
        setOrders(cached);
        if (cached.length > 0) setOrder(cached[0]);
        setLoading(false);

        // Фоново оновлюємо статуси/суми з бекенду, але зберігаємо image/title з кешу
        const refreshed = await Promise.all(
          cached.map(async (cachedOrder) => {
            const fresh = await fetchOrder(cachedOrder.id);
            if (!fresh) return cachedOrder;
            return {
              ...fresh,
              items: fresh.items.map((freshItem, i) => ({
                ...freshItem,
                title: cachedOrder.items[i]?.title || freshItem.title,
                image: cachedOrder.items[i]?.image || freshItem.image,
                price: cachedOrder.items[i]?.price || freshItem.price,
              })),
            };
          })
        );

        setOrders(refreshed);
        if (refreshed.length > 0) setOrder(refreshed[0]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshed));

      } catch {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const addOrder = (newOrder: Order) => {
    setOrder(newOrder);
    setOrders((prev) => {
      const updated = [newOrder, ...prev.filter((o) => o.id !== newOrder.id)];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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