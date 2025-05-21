"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { useGetCurrentUserQuery } from "./slices/authSlice";
import { useAppDispatch } from "./hooks";
import { setCredentials } from "./slices/authSlice";

// Auth Initializer component
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setCredentials({ user, token }));
      }
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
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
