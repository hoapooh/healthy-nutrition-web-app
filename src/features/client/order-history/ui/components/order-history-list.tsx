"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { OrderItemHistory } from "@/types/order";
import { OrderDetailsDialog } from "./order-details-dialog";
import { Package, DollarSign } from "lucide-react";

interface OrderHistoryListProps {
  orders: OrderItemHistory[];
  isLoading?: boolean;
}

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "paid":
    case "success":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "pending":
    case "processing":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "cancelled":
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export const OrderHistoryList: React.FC<OrderHistoryListProps> = ({
  orders,
  isLoading = false,
}) => {
  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(
    null,
  );

  const handleViewDetails = (orderCode: number) => {
    setSelectedOrderCode(orderCode.toString());
  };

  const handleCloseDialog = () => {
    setSelectedOrderCode(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                  <div className="h-3 w-32 rounded bg-gray-200"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                  <div className="h-6 w-16 rounded bg-gray-200"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.orderCode}
            className="transition-shadow duration-200 hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-lg font-semibold">
                      Order #{order.orderCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(order.status)}
                    >
                      {order.status === "PAID"
                        ? "Đã thanh toán"
                        : order.status === "PENDING"
                          ? "Đang chờ"
                          : order.status === "CANCELLED"
                            ? "Đã hủy"
                            : "Không xác định"}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order.orderCode)}
                    className="hover:text-primary-foreground hover:bg-green-600"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOrderCode && (
        <OrderDetailsDialog
          orderCode={selectedOrderCode}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
};
