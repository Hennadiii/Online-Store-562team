// ── Типи для UI ───────────────────────────────────────────────────────────

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDTO {
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
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
  paymentMethod: "cash";
  items: OrderItem[];
  totalAmount: number;
}

// ── PostOrderDto (те що відправляємо на бекенд) ────────────────────────────

export interface BackendPostOrderDto {
  customerName: string;
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

// ── DisplayOrderDto (те що бекенд повертає) ────────────────────────────────

export interface BackendDisplayOrderDto {
  id: number;
  customerName: string;
  orderItems: { id: number; productId: number; quantity: number }[];
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
}