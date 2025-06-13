import ProtectedAuthRoute from "@/features/shared/ui/components/protected/protected-auth-route";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAuthRoute>
      <div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </ProtectedAuthRoute>
  );
}
