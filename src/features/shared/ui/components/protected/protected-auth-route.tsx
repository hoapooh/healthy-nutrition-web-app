"use client";
import { useAuth } from "@/store/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLoader from "../app-loader";

interface ProtectedAuthRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedAuthRoute({
  children,
  redirectTo = "/",
}: ProtectedAuthRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo); // Redirect to home if authenticated
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading) {
    return <AppLoader />;
  }

  return !isAuthenticated ? <>{children}</> : null;
}
