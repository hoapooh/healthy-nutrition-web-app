"use client";

import { Calendar, Loader2, Package, Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OrderItemPayment, OrderStatus } from "@/types/order";
import { formatCurrency } from "@/utils/format-currency";
import { getOrderStatusText } from "@/utils/order-status-utils";

import { useOrderDetails } from "../../hooks/use-order-history";

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
            <DialogTitle>Lỗi</DialogTitle>
          </DialogHeader>
          <p className="text-red-600">
            Không thể tải chi tiết đơn hàng. Vui lòng thử lại.
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
            Chi tiết đơn hàng
          </DialogTitle>
          <DialogDescription>
            Xem chi tiết đầy đủ của đơn hàng của bạn
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Đang tải chi tiết đơn hàng...</span>
          </div>
        ) : orderDetails ? (
          <div className="space-y-6">
            <Card className="py-0">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Đơn hàng #{orderDetails.orderCode}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date().toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge className={getStatusColor(orderDetails.status)}>
                    {getOrderStatusText(orderDetails.status as OrderStatus)}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Tổng tiền</span>
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
                  Sản phẩm trong đơn hàng ({orderDetails.items.length})
                </h3>
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
                          <Link
                            href={`/products/${item.productId}`}
                            className="transition-colors duration-200 hover:text-green-600"
                          >
                            <h4 className="font-medium">{item.productName}</h4>
                          </Link>
                          <div className="space-y-1">
                            <p className="text-muted-foreground text-sm">
                              Trọng lượng: {item.weight}kg
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Số lượng: {item.quantity}{" "}
                              {item.quantity > 1 ? "cái" : "cái"}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Giá trên kg:{" "}
                              {formatCurrency(item.pricePerKilogram)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(
                              item.pricePerKilogram *
                                item.weight *
                                item.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính</span>
                    <span>
                      {formatCurrency(
                        orderDetails.items.reduce(
                          (sum: number, item: OrderItemPayment) =>
                            sum +
                            item.pricePerKilogram * item.weight * item.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Tổng cộng</span>
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
            <p className="text-muted-foreground">
              Không tìm thấy chi tiết đơn hàng.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
