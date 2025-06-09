"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, ShoppingCart } from "lucide-react";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";

const PaymentCancelledPage = () => {
  const router = useRouter();

  return (
    <ProtectedRoute allowedRoles={["User"]} requireAuth redirectTo="/">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Payment Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              {" "}
              <p className="text-muted-foreground">
                Your payment process has been cancelled. Don&apos;t worry, no
                charges were made to your account.
              </p>
              <p className="text-muted-foreground text-sm">
                You can continue shopping or return to your cart to try again.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => router.push("/")}
                variant="healthy"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
              <Button
                onClick={() => router.push("/cart")}
                variant="outline"
                className="gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Back to Cart
              </Button>
            </div>

            <div className="text-muted-foreground text-xs">
              <p>Need help? Contact our support team for assistance.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default PaymentCancelledPage;
