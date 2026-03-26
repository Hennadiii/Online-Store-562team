// ── Типи для UI ───────────────────────────────────────────────────────────

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Recipient {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CreateOrderDTO {
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  recipient?: Recipient;
  delivery: {
    method: "pickup" | "courier";
    city?: string;
    region?: string;
    street?: string;
    build?: string;
    apartament?: string;
    floor?: string;
    elevator?: boolean;
  };
  paymentMethod: "cash" | "prepayment";
  items: OrderItem[];
  totalAmount: number;
}

// ── PostOrderDto (те що відправляємо на бекенд) ────────────────────────────

export interface BackendPostOrderDto {
  // Було: customerName (один рядок) — тепер окремі поля
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  recipientName?: string;
  recipientPhone?: string;
  guest?: boolean;
  userId?: string;
  orderItems: { productId: number; quantity: number }[];
  delivery: {
    deliveryMode: "SELF_PICKUP" | "COURIER_DELIVERY";
    city?: string;
    region?: string;
    street?: string;
    build?: string;
    apartament?: string;
    floor?: string;
    elevator?: boolean;
  };
}

// ── DisplayOrderItemDto ────────────────────────────────────────────────────

export interface BackendDisplayOrderItemDto {
  id: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  amount: number;
}

// ── DisplayOrderDto ────────────────────────────────────────────────────────

export interface BackendDisplayOrderDto {
  id: number;
  // Було: customerName (один рядок) — тепер окремі поля
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  recipientName?: string;
  recipientPhone?: string;
  guestToken?: string;
  orderItems: BackendDisplayOrderItemDto[];
  delivery: {
    id: number;
    deliveryMode: string;
    city?: string;
    region?: string;
    street?: string;
    build?: string;
    apartament?: string;
    floor?: string;
    elevator?: boolean;
  };
  createdAt: string;
  updatedAt: string | null;
  status: string;
  amount: number;
}

// ── Order (фронтенд UI) ────────────────────────────────────────────────────

export interface Order extends CreateOrderDTO {
  id: string;
  status: "created";
  createdAt: string;
  guestToken?: string;
}