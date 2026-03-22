"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order } from "@/@types/order";
import { fetchOrder } from "@/services/orderService";

const STORAGE_KEY = "orders_data";
const GUEST_TOKENS_KEY = "guestOrderTokens";

interface OrderContextType {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  addOrder: (order: Order) => void;
  getGuestToken: (orderId: string) => string | undefined;
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
        setOrders(cached);
        if (cached.length > 0) setOrder(cached[0]);
        setLoading(false);

        // Фоново оновлюємо з бекенду зберігаючи image/title з кешу
        const guestTokens: Record<string, string> = JSON.parse(
          localStorage.getItem(GUEST_TOKENS_KEY) || "{}"
        );

        const refreshed = await Promise.all(
          cached.map(async (cachedOrder) => {
            const token = guestTokens[cachedOrder.id];
            const fresh = await fetchOrder(cachedOrder.id, token);
            if (!fresh) return cachedOrder;
            return {
              ...fresh,
              guestToken: cachedOrder.guestToken,
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

        // Зберігаємо guestToken окремо для доступу при fetchOrder
        if (newOrder.guestToken) {
          const guestTokens: Record<string, string> = JSON.parse(
            localStorage.getItem(GUEST_TOKENS_KEY) || "{}"
          );
          guestTokens[newOrder.id] = newOrder.guestToken;
          localStorage.setItem(GUEST_TOKENS_KEY, JSON.stringify(guestTokens));
        }
      } catch {}
      return updated;
    });
  };

  const getGuestToken = (orderId: string): string | undefined => {
    try {
      const guestTokens: Record<string, string> = JSON.parse(
        localStorage.getItem(GUEST_TOKENS_KEY) || "{}"
      );
      return guestTokens[orderId];
    } catch {
      return undefined;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, order, loading, addOrder, getGuestToken }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrderContext must be used within OrderProvider");
  return ctx;
};