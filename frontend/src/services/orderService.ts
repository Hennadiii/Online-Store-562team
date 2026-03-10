import { CreateOrderDTO, Order, BackendPostOrderDto, BackendDisplayOrderDto } from "@/@types/order";

const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL;

// ── Маппінг фронтенд → бекенд ─────────────────────────────────────────────

function mapToBackend(data: CreateOrderDTO): BackendPostOrderDto {
  const { customer, delivery, items } = data;

  return {
    customerName: `${customer.firstName} ${customer.lastName}`,
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

// ── Маппінг бекенд → фронтенд Order ───────────────────────────────────────

function mapFromBackend(
  backend: BackendDisplayOrderDto,
  original?: Partial<CreateOrderDTO>
): Order {
  const deliveryMode = backend.delivery?.deliveryMode;
  const method = deliveryMode === "SELF_PICKUP" ? "pickup" : "courier";

  return {
    id: String(backend.id),
    status: "created",
    createdAt: backend.createdAt ?? new Date().toISOString(),
    customer: original?.customer ?? {
      firstName: backend.customerName?.split(" ")[0] ?? "",
      lastName: backend.customerName?.split(" ").slice(1).join(" ") ?? "",
      phone: "",
      email: "",
    },
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
    paymentMethod: "cash",
    items: original?.items ?? backend.orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      title: "",
      image: "",
      price: 0,
    })),
    totalAmount: original?.totalAmount ?? backend.amount ?? 0,
  };
}

// ── Створити замовлення ────────────────────────────────────────────────────

export async function submitOrder(data: CreateOrderDTO): Promise<Order> {
  const backendPayload = mapToBackend(data);

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

// ── Завантажити замовлення за ID ───────────────────────────────────────────

export async function fetchOrder(id: string): Promise<Order | null> {
  try {
    const response = await fetch(`${ORDER_API_URL}/orders/${id}`);
    if (!response.ok) return null;
    const backend: BackendDisplayOrderDto = await response.json();
    return mapFromBackend(backend);
  } catch {
    return null;
  }
}