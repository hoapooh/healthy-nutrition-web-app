import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api-slice";
import { authReducer } from "./slices/auth-slice";
import { cartReducer } from "./slices/cart-slice";

const rootReducer = {
  auth: authReducer,
  cart: cartReducer,
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      ...rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
