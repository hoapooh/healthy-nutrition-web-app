"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, CreditCard } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  selectCartTotalItems,
  selectCartTotalPrice,
} from "@/store/slices/cart-slice";
import { formatCurrency } from "@/utils/format-currency";

interface CartSummaryProps {
  className?: string;
  showCheckout?: boolean;
}

export const CartSummary = ({
  className = "",
  showCheckout = true,
}: CartSummaryProps) => {
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  // Calculate shipping (free for orders over $50)
  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const subtotal = totalPrice;
  const finalTotal = subtotal + shippingCost;

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log("Proceeding to checkout...");
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <Card className={`sticky top-4 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({totalItems} items)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span
              className={shippingCost === 0 ? "font-medium text-green-600" : ""}
            >
              {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
            </span>
          </div>

          {totalPrice < 50 && totalPrice > 0 && (
            <div className="text-muted-foreground rounded bg-blue-50 p-2 text-xs">
              Add {formatCurrency(50 - totalPrice)} more for free shipping!
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">{formatCurrency(finalTotal)}</span>
        </div>
      </CardContent>

      {showCheckout && (
        <CardFooter>
          <Button
            onClick={handleCheckout}
            className="w-full"
            size="lg"
            variant="healthy"
            disabled={totalItems === 0}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Proceed to Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
