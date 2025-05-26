"use client";
import { useAuth } from "@/store/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLoader from "../app-loader";

export default function ProtectedAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/"); // Redirect to home if authenticated
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <AppLoader />;
  }

  return !isAuthenticated ? <>{children}</> : null;
}
