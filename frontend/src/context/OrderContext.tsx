"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order } from "@/@types/order";
import { fetchOrder, fetchOrdersByUser } from "@/services/orderService";
import { authService } from "@/services/authService";

const STORAGE_KEY = "orders_data";
const GUEST_TOKENS_KEY = "guestOrderTokens";
const BANNER_KEY = "guestOrderBanner";
const BANNER_TTL_MS = 30 * 60 * 1000;

interface BannerData {
  link: string;
  expiresAt: number;
}

interface OrderContextType {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  addOrder: (order: Order) => void;
  getGuestToken: (orderId: string) => string | undefined;
  showGuestBanner: boolean;
  guestBannerLink: string | null;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGuestBanner, setShowGuestBanner] = useState(false);
  const [guestBannerLink, setGuestBannerLink] = useState<string | null>(null);

  // Відновлюємо банер з localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BANNER_KEY);
      if (raw) {
        const banner: BannerData = JSON.parse(raw);
        const remaining = banner.expiresAt - Date.now();
        if (remaining > 0) {
          setGuestBannerLink(banner.link);
          setShowGuestBanner(true);
          setTimeout(() => {
            setShowGuestBanner(false);
            localStorage.removeItem(BANNER_KEY);
          }, remaining);
        } else {
          localStorage.removeItem(BANNER_KEY);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = authService.getAccessToken();

        if (token) {
          // Авторизований — завантажуємо з бекенду по userId
          const profile = await authService.getMe();
          if (profile?.id) {
            const userOrders = await fetchOrdersByUser(profile.id);
            setOrders(userOrders);
            if (userOrders.length > 0) setOrder(userOrders[0]);
          }
          setLoading(false);
          return;
        }

        // Гість — завантажуємо з localStorage
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) { setLoading(false); return; }

        const cached: Order[] = JSON.parse(raw);
        setOrders(cached);
        if (cached.length > 0) setOrder(cached[0]);
        setLoading(false);

        const guestTokens: Record<string, string> = JSON.parse(
          localStorage.getItem(GUEST_TOKENS_KEY) || "{}"
        );

        const refreshed = await Promise.all(
          cached.map(async (cachedOrder) => {
            const guestToken = guestTokens[cachedOrder.id];
            const fresh = await fetchOrder(cachedOrder.id, guestToken);
            if (!fresh) return cachedOrder;
            return {
              ...fresh,
              guestToken: cachedOrder.guestToken,
              customer: cachedOrder.customer,
              recipient: cachedOrder.recipient ?? fresh.recipient,
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
        // Зберігаємо в localStorage тільки guest замовлення
        if (newOrder.guestToken) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

          const guestTokens: Record<string, string> = JSON.parse(
            localStorage.getItem(GUEST_TOKENS_KEY) || "{}"
          );
          guestTokens[newOrder.id] = newOrder.guestToken;
          localStorage.setItem(GUEST_TOKENS_KEY, JSON.stringify(guestTokens));

          const link = `/orders/${newOrder.id}?token=${newOrder.guestToken}`;
          const banner: BannerData = {
            link,
            expiresAt: Date.now() + BANNER_TTL_MS,
          };
          localStorage.setItem(BANNER_KEY, JSON.stringify(banner));

          setGuestBannerLink(link);
          setShowGuestBanner(true);
          setTimeout(() => {
            setShowGuestBanner(false);
            localStorage.removeItem(BANNER_KEY);
          }, BANNER_TTL_MS);
        } else {
          // User замовлення — зберігаємо тільки в пам'яті (state)
          // localStorage не використовуємо — дані беруться з бекенду
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
    <OrderContext.Provider value={{
      orders, order, loading, addOrder, getGuestToken,
      showGuestBanner, guestBannerLink,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrderContext must be used within OrderProvider");
  return ctx;
};