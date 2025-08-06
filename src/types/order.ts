export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  SHIPPING = "SHIPPING",
  SHIPPED = "SHIPPED",
}

// Types
export interface OrderItemPayment {
  productId: string;
  productName: string;
  productImageUrl?: string;
  quantity: number;
  weight: number;
  pricePerKilogram: number;
}

export interface OrderItemHistory {
  orderCode: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt?: string;
}

// GET
export interface GetAllOrdersResponse {
  items: OrderItemHistory[];
  totalCount: number;
}

export interface GetAllOrdersParams {
  pageIndex?: number;
  limit?: number;
  status: OrderStatus;
}

export interface GetOrderByCodeResponse {
  orderCode: number;
  items: OrderItemPayment[];
  totalAmount: number;
  status: OrderStatus;
}

export interface GetOrderByCodeParams {
  code: string;
}

export interface GetOrderByUserResponse {
  items: OrderItemHistory[];
  totalCount: number;
}

// POST
export interface CreatePaymentLinkResponse {
  checkoutUrl: string;
}

export interface CreatePaymentLinkBody {
  orderInformation: {
    items: OrderItemPayment[];
  };
  returnUrl: string;
  cancelUrl: string;
}

// PUT
export interface UpdateOrderStatusBody {
  orderCode: number;
  status: OrderStatus;
}
