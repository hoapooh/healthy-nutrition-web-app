"use client";

import React from "react";
import { OrderItemHistory } from "@/types/order";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format-currency";

interface OrderDetailsDrawerProps {
  order: OrderItemHistory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDrawer({
  order,
  open,
  onOpenChange,
}: OrderDetailsDrawerProps) {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "Hoàn thành";
      case "pending":
        return "Đang chờ";
      case "cancelled":
        return "Đã hủy";
      case "failed":
        return "Thất bại";
      case "processing":
        return "Đang xử lý";
      default:
        return status;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Chi tiết đơn hàng</SheetTitle>
          <SheetDescription>
            Xem thông tin chi tiết về đơn hàng #{order.orderCode}
          </SheetDescription>
        </SheetHeader>

        <div className="mx-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Mã đơn hàng:
                </span>
                <span className="font-mono text-sm">#{order.orderCode}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Trạng thái:
                </span>
                <Badge
                  className={getStatusColor(order.status)}
                  variant="outline"
                >
                  {getStatusText(order.status)}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Tổng tiền:
                </span>
                <span className="text-primary text-lg font-bold">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ghi chú</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Để xem chi tiết sản phẩm trong đơn hàng, vui lòng sử dụng API
                getOrderByCode với mã đơn hàng #{order.orderCode}.
              </p>
            </CardContent>
          </Card> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
