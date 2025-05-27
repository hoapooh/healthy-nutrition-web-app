"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { setCredentials, clearCredentials } from "./slices/auth-slice";
import { AuthUtils } from "@/lib/auth-utils";
import AppLoader from "@/features/shared/ui/components/app-loader";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider handles the initialization of authentication state from localStorage
 * This runs only once when the app starts and prevents unnecessary API calls
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    const storedToken = AuthUtils.getToken();
    if (storedToken) {
      // Set only the token, user data will be fetched by useAuth hook
      // Don't set isAuthenticated to true yet - wait for user data to be fetched
      dispatch(
        setCredentials({
          user: null, // Don't set dummy user data
          token: storedToken,
        }),
      );
    } else {
      // Ensure clean state if no token
      dispatch(clearCredentials());
    }

    setIsInitialized(true);
  }, [dispatch]);

  // Don't render children until auth state is initialized
  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  return <>{children}</>;
}
