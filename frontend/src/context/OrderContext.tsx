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

// Сортування: від нових до старих
const sortByDateDesc = (orders: Order[]): Order[] =>
  [...orders].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGuestBanner, setShowGuestBanner] = useState(false);
  const [guestBannerLink, setGuestBannerLink] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null | undefined>(undefined);

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

  // Ефект 1: визначаємо початковий userId при монтуванні
  useEffect(() => {
    const initUser = async () => {
      try {
        const token = authService.getAccessToken();
        if (token) {
          const profile = await authService.getMe();
          setCurrentUserId(profile?.id ?? null);
        } else {
          setCurrentUserId(null);
        }
      } catch {
        setCurrentUserId(null);
      }
    };

    initUser();
  }, []);

  // Ефект 2: слухаємо події auth:login і auth:logout
  useEffect(() => {
    const handleLogin = (e: Event) => {
      const userId = (e as CustomEvent<{ userId?: string }>).detail?.userId;
      setCurrentUserId(userId ?? null);
    };

    const handleLogout = () => {
      setCurrentUserId(null);
    };

    window.addEventListener("auth:login", handleLogin);
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:login", handleLogin);
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  // Ефект 3: завантажуємо замовлення при зміні currentUserId
  useEffect(() => {
    if (currentUserId === undefined) return;

    const loadOrders = async () => {
      setOrders([]);
      setOrder(null);
      setLoading(true);

      try {
        if (currentUserId) {
          // Авторизований — запит до бекенду
          const userOrders = await fetchOrdersByUser(currentUserId);
          // Сортуємо DESC: новіші замовлення зверху
          const sorted = sortByDateDesc(userOrders);
          setOrders(sorted);
          if (sorted.length > 0) setOrder(sorted[0]);
          setLoading(false);
          return;
        }

        // Гість — завантажуємо з localStorage
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setLoading(false);
          return;
        }

        const cached: Order[] = JSON.parse(raw);
        // Сортуємо одразу при відновленні з кешу
        const sortedCached = sortByDateDesc(cached);
        setOrders(sortedCached);
        if (sortedCached.length > 0) setOrder(sortedCached[0]);
        setLoading(false);

        const guestTokens: Record<string, string> = JSON.parse(
          localStorage.getItem(GUEST_TOKENS_KEY) || "{}"
        );

        const refreshed = await Promise.all(
          sortedCached.map(async (cachedOrder) => {
            const guestToken = guestTokens[cachedOrder.id];
            const fresh = await fetchOrder(cachedOrder.id, guestToken);
            if (!fresh) return cachedOrder;
            return {
              ...fresh,
              guestToken: cachedOrder.guestToken,
              // Зберігаємо контактні дані клієнта з кешу — вони точні
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

        // Зберігаємо вже посортований оновлений список
        const sortedRefreshed = sortByDateDesc(refreshed);
        setOrders(sortedRefreshed);
        if (sortedRefreshed.length > 0) setOrder(sortedRefreshed[0]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedRefreshed));

      } catch {
        setLoading(false);
      }
    };

    loadOrders();
  }, [currentUserId]);

  const addOrder = (newOrder: Order) => {
    setOrder(newOrder);
    setOrders((prev) => {
      // Новий заказ завжди першим — сортування збережеться
      const updated = sortByDateDesc([newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
      try {
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