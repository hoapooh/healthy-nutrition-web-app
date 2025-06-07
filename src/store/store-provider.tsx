"use client";

import { Provider } from "react-redux";
import { useRef, useEffect } from "react";
import { AppStore, makeStore } from "./store";
import { AuthProvider } from "./auth-provider";
import AppLoader from "@/features/shared/ui/components/app-loader";
import { useAuth } from "./hooks/use-auth";
import { initializeCart } from "./slices/cart-slice";

// Auth Initializer component - handles user data fetching after token is set
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  return <>{children}</>;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Initialize cart from localStorage when the store is created
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(initializeCart());
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <AuthProvider>
        <AuthInitializer>{children}</AuthInitializer>
      </AuthProvider>
    </Provider>
  );
}
