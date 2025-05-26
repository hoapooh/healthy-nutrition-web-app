"use client";

import { Provider } from "react-redux";
import { useRef, useEffect } from "react";
import { AppStore, makeStore } from "./store";

import { useAppDispatch } from "./hooks";
import { setCredentials } from "./slices/authSlice";
import { useGetCurrentUserQuery } from "./slices/authSlice";
import AppLoader from "@/features/shared/ui/components/app-loader";

// Auth Initializer component
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("healthy-nutrition-token");
      if (token) {
        dispatch(setCredentials({ user, token }));
      }
    }
  }, [user, dispatch]);

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

  return (
    <Provider store={storeRef.current}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
