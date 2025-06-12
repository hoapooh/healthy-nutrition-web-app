import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddToCartPayload,
  CartItem,
  CartState,
  UpdateCartItemPayload,
} from "@/types/cart";
import { calculatePriceByWeight } from "@/utils/weight-utils";

// Helper functions
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { totalItems, totalPrice };
};

const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const storedCart = localStorage.getItem("healthy-nutrition-cart");
    const items = storedCart ? JSON.parse(storedCart) : [];
    
    // Migrate legacy cart items that don't have availableWeights
    return items.map((item: any) => ({
      ...item,
      availableWeights: item.availableWeights || [item.weight || 1000], // fallback to current weight or 1kg
    }));
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("healthy-nutrition-cart", JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      const savedItems = getCartFromStorage();
      state.items = savedItems;
      const totals = calculateTotals(savedItems);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const {
        productId,
        name,
        price,
        quantity,
        imageUrl,
        stockQuantity,
        weight,
        pricePerKg,
        availableWeights,
      } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId && item.weight === weight,
      );

      if (existingItem) {
        // Update quantity if item already exists with same weight
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          stockQuantity,
        );
        existingItem.quantity = newQuantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${productId}_${weight}`,
          productId,
          name,
          price,
          quantity: Math.min(quantity, stockQuantity),
          imageUrl,
          stockQuantity,
          maxQuantity: stockQuantity,
          weight,
          pricePerKg,
          availableWeights,
        };
        state.items.push(newItem);
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state.items);
    },
    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const { productId, quantity, weight } = action.payload;

      if (weight !== undefined) {
        // Find item by productId and weight for weight updates
        const item = state.items.find((item) => item.productId === productId);
        if (item) {
          // Update weight and recalculate price
          item.weight = weight;
          item.price = calculatePriceByWeight(item.pricePerKg, weight);
        }
      } else if (quantity !== undefined) {
        // Find item by productId for quantity updates
        const item = state.items.find((item) => item.productId === productId);
        if (item) {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            state.items = state.items.filter(
              (item) => item.productId !== productId,
            );
          } else {
            // Update quantity (ensure it doesn't exceed stock)
            item.quantity = Math.min(quantity, item.maxQuantity);
          }
        }
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state.items);
    },

    updateCartItemWeight: (
      state,
      action: PayloadAction<{ itemId: string; weight: number }>,
    ) => {
      const { itemId, weight } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        item.weight = weight;
        item.price = calculatePriceByWeight(item.pricePerKg, weight);

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("healthy-nutrition-cart");
      }
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  initializeCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  updateCartItemWeight,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalItems = (state: { cart: CartState }) =>
  state.cart.totalItems;
export const selectCartTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;
export const selectCartIsOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;
export const selectCartItemByProductId =
  (productId: string) => (state: { cart: CartState }) =>
    state.cart.items.find((item) => item.productId === productId);
