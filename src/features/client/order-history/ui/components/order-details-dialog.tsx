"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { useOrderDetails } from "../../hooks/use-order-history";
import { OrderItemPayment } from "@/types/order";
import { Package, Receipt, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";

interface OrderDetailsDialogProps {
  orderCode: string;
  onClose: () => void;
}

export const OrderDetailsDialog = ({
  orderCode,
  onClose,
}: OrderDetailsDialogProps) => {
  const { orderDetails, isLoading, error } = useOrderDetails(orderCode);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <p className="text-red-600">
            Failed to load order details. Please try again.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[80vh] max-w-4xl min-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Order Details
          </DialogTitle>
          <DialogDescription>
            View complete details of your order
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading order details...</span>
          </div>
        ) : orderDetails ? (
          <div className="space-y-6">
            <Card className="py-0">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Order #{orderDetails.orderCode}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(orderDetails.status)}>
                    {orderDetails.status}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(orderDetails.totalAmount)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="py-0">
              <CardContent className="p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Package className="h-5 w-5" />
                  Order Items ({orderDetails.items.length})
                </h3>{" "}
                <div className="space-y-4">
                  {orderDetails.items.map(
                    (item: OrderItemPayment, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg border p-3"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={item!.productImageUrl!}
                            alt={item.productName}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-md object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/healthy-product.png"; // Fallback image
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-muted-foreground text-sm">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Price per unit: {formatCurrency(item.pricePerUnit)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(item.pricePerUnit * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>
                      {formatCurrency(
                        orderDetails.items.reduce(
                          (sum: number, item: OrderItemPayment) =>
                            sum + item.pricePerUnit * item.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">
                      {formatCurrency(orderDetails.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Order details not found.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
