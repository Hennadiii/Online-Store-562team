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
  
  export interface Order extends CreateOrderDTO {
    id: string;
    status: "created";
    createdAt: string;
  }