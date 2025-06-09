// Types
export interface OrderItemPayment {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  productImageUrl?: string;
}

export interface OrderItemHistory {
  orderCode: number;
  totalAmount: number;
  status: string;
}

// GET
export interface GetAllOrdersResponse {
  items: OrderItemHistory[];
  totalCount: number;
}

export interface GetAllOrdersParams {
  pageIndex?: number;
  limit?: number;
}

export interface GetOrderByCodeResponse {
  orderCode: number;
  items: OrderItemPayment[];
  totalAmount: number;
  status: string;
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
