import { CreateOrderDTO, Order } from "@/@types/order";

// Берем URL из переменных окружения Vercel
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitOrder(data: CreateOrderDTO): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Если бэкенд ответит ошибкой (например, 400 или 500)
    throw new Error(`Ошибка оформления заказа: ${response.statusText}`);
  }

  return await response.json();
}