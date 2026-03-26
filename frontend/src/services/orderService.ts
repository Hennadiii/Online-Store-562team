import { CreateOrderDTO, Order, BackendPostOrderDto, BackendDisplayOrderDto } from "@/@types/order";
import { getProductById } from "@/services/productService";

const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL;

function mapToBackend(data: CreateOrderDTO, isGuest = false, userId?: string): BackendPostOrderDto {
  const { customer, recipient, delivery, items } = data;

  return {
    // Було: customerName: `${customer.firstName} ${customer.lastName}`
    // Стало: окремі поля — бекенд більше не парсить рядок
    customerFirstName: customer.firstName,
    customerLastName: customer.lastName,
    customerPhone: customer.phone,
    customerEmail: customer.email,
    guest: isGuest,
    userId: isGuest ? undefined : userId,
    ...(recipient &&
      (recipient.firstName !== customer.firstName ||
        recipient.lastName !== customer.lastName ||
        recipient.phone !== customer.phone) && {
        recipientName: `${recipient.firstName} ${recipient.lastName}`,
        recipientPhone: recipient.phone,
      }),
    orderItems: items.map(({ productId, quantity }) => ({ productId, quantity })),
    delivery: {
      deliveryMode: delivery.method === "pickup" ? "SELF_PICKUP" : "COURIER_DELIVERY",
      city: delivery.city,
      region: delivery.region,
      street: delivery.street,
      build: delivery.build,
      apartament: delivery.apartament,
      floor: delivery.floor,
      elevator: delivery.elevator,
    },
  };
}

function mapFromBackend(
  backend: BackendDisplayOrderDto,
  original?: Partial<CreateOrderDTO>
): Order {
  const deliveryMode = backend.delivery?.deliveryMode;
  const method = deliveryMode === "SELF_PICKUP" ? "pickup" : "courier";

  const recipientFromBackend = backend.recipientName
    ? {
        firstName: backend.recipientName.split(" ")[0] ?? "",
        lastName: backend.recipientName.split(" ").slice(1).join(" ") ?? "",
        phone: backend.recipientPhone ?? "",
      }
    : undefined;

  return {
    id: String(backend.id),
    status: "created",
    createdAt: backend.createdAt ?? new Date().toISOString(),
    guestToken: backend.guestToken,
    customer: original?.customer ?? {
      // Було: backend.customerName?.split(" ") — ненадійний парсинг рядка
      // Стало: читаємо окремі поля напряму, phone і email більше не губляться
      firstName: backend.customerFirstName ?? "",
      lastName: backend.customerLastName ?? "",
      phone: backend.customerPhone ?? "",
      email: backend.customerEmail ?? "",
    },
    recipient: original?.recipient ?? recipientFromBackend,
    delivery: original?.delivery ?? {
      method,
      city: backend.delivery?.city,
      region: backend.delivery?.region,
      street: backend.delivery?.street,
      build: backend.delivery?.build,
      apartament: backend.delivery?.apartament,
      floor: backend.delivery?.floor,
      elevator: backend.delivery?.elevator,
    },
    paymentMethod: method === "pickup" ? "cash" : "prepayment",
    items: original?.items ?? backend.orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      title: "",
      image: "",
      price: item.pricePerUnit ?? 0,
    })),
    totalAmount: original?.totalAmount ?? backend.amount ?? 0,
  };
}

async function enrichItemsFromCatalog(order: Order): Promise<Order> {
  const needsEnrichment = order.items.some((item) => !item.title || !item.image);
  if (!needsEnrichment) return order;

  const enrichedItems = await Promise.all(
    order.items.map(async (item) => {
      if (item.title && item.image) return item;
      try {
        const product = await getProductById(item.productId);
        return {
          ...item,
          title: product.title,
          image: product.images?.[0] ?? "",
          price: item.price > 0 ? item.price : product.price,
        };
      } catch {
        return item;
      }
    })
  );

  return { ...order, items: enrichedItems };
}

export async function submitOrder(
  data: CreateOrderDTO,
  isGuest = false,
  userId?: string
): Promise<Order> {
  const backendPayload = mapToBackend(data, isGuest, userId);

  const response = await fetch(`${ORDER_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendPayload),
  });

  if (!response.ok) {
    throw new Error(`Помилка оформлення замовлення: ${response.statusText}`);
  }

  const backend: BackendDisplayOrderDto = await response.json();
  return mapFromBackend(backend, data);
}

export async function fetchOrder(id: string, token?: string): Promise<Order | null> {
  try {
    const url = token
      ? `${ORDER_API_URL}/orders/${id}?token=${token}`
      : `${ORDER_API_URL}/orders/${id}`;

    const response = await fetch(url);
    if (!response.ok) return null;
    const backend: BackendDisplayOrderDto = await response.json();
    const order = mapFromBackend(backend);
    return await enrichItemsFromCatalog(order);
  } catch {
    return null;
  }
}

export async function fetchOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const response = await fetch(
      `${ORDER_API_URL}/orders/user/${userId}?page=0&pageSize=50`
    );
    if (!response.ok) return [];
    const backends: BackendDisplayOrderDto[] = await response.json();
    const orders = backends.map((b) => mapFromBackend(b));
    const enriched = await Promise.all(orders.map(enrichItemsFromCatalog));

    // Страховка на фронті: сортуємо DESC на випадок якщо бекенд поверне не в тому порядку
    return enriched.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}