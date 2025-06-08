"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cart-slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear the cart when user arrives on this page after successful payment
    dispatch(clearCart());
    toast.success("Payment successful! Your order has been confirmed.");
  }, [dispatch]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewProducts = () => {
    router.push("/products");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="text-center">
        <Card>
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2 text-lg">
                Thank you for your order!
              </p>
              <p className="text-muted-foreground text-sm">
                Your payment has been processed successfully and your order is
                being prepared. You should receive a confirmation email shortly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleGoHome}
                className="gap-2"
                variant={"healthy"}
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
              <Button
                onClick={handleViewProducts}
                variant="outline"
                className="gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Button>
            </div>

            <div className="border-t pt-4">
              <p className="text-muted-foreground text-xs">
                If you have any questions about your order, please contact our
                support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
