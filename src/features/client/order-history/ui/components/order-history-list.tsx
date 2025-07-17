"use client";

import { DollarSign, Package } from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderItemHistory, OrderStatus } from "@/types/order";
import { formatCurrency } from "@/utils/format-currency";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/utils/order-status-utils";

import { OrderDetailsDialog } from "./order-details-dialog";

interface OrderHistoryListProps {
  orders: OrderItemHistory[];
  isLoading?: boolean;
}

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
                      Đơn hàng #{order.orderCode}
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
                      variant={getOrderStatusBadgeVariant(
                        order.status as OrderStatus,
                      )}
                    >
                      {getOrderStatusText(order.status as OrderStatus)}
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
