import { CreateOrderDTO, Order } from "@/@types/order";

// Заменить на fetch("/api/orders", { method: "POST" }) при подключении backend
export async function submitOrder(data: CreateOrderDTO): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 800)); // имитация запроса

  return {
    ...data,
    id: Math.random().toString(36).slice(2, 9).toUpperCase(),
    status: "created",
    createdAt: new Date().toISOString(),
  };
}