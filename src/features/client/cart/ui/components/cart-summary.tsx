"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  // Calculate shipping (free for orders over $50)
  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const subtotal = totalPrice;
  const finalTotal = subtotal + shippingCost;
  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <Card className={`sticky top-4 ${className}`}>
      <CardHeader>
        {" "}
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Tóm tắt đơn hàng
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {" "}
          <div className="flex justify-between text-sm">
            <span>Tạm tính ({totalItems} sản phẩm)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Vận chuyển</span>
            <span
              className={shippingCost === 0 ? "font-medium text-green-600" : ""}
            >
              {shippingCost === 0 ? "MIỄN PHÍ" : formatCurrency(shippingCost)}
            </span>
          </div>
          {totalPrice < 50 && totalPrice > 0 && (
            <div className="text-muted-foreground rounded bg-blue-50 p-2 text-xs">
              Thêm {formatCurrency(50 - totalPrice)} để được miễn phí vận
              chuyển!
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Tổng cộng</span>
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
            Tiến hành thanh toán
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
