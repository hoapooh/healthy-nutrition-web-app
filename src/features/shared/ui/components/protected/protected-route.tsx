"use client";
import { useAuth } from "@/store/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLoader from "../app-loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: ("User" | "Admin")[];
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = "/sign-in",
  allowedRoles = ["User", "Admin"]
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && requireAuth) {
      if (!isAuthenticated) {
        router.replace(redirectTo);
        return;
      }

      // Check role permissions
      if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role || "User")) {
        router.replace("/unauthorized");
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, requireAuth, router, redirectTo, allowedRoles]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If role is required but user doesn't have permission, don't render children
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role || "User")) {
    return null;
  }

  return <>{children}</>;
}
