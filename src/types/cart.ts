export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stockQuantity: number;
  maxQuantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

export interface AddToCartPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stockQuantity: number;
}

export interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}
