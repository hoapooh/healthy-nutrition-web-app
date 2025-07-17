"use client";

import { ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUpdateOrderStatusMutation } from "@/services/order-services";
import { OrderItemHistory, OrderStatus } from "@/types/order";
import { formatCurrency } from "@/utils/format-currency";
import {
  canUpdateOrderStatus,
  getAllOrderStatuses,
  getNextOrderStatus,
  getOrderStatusBadgeVariant,
  getOrderStatusColorClasses,
  getOrderStatusIndex,
  getOrderStatusText,
} from "@/utils/order-status-utils";

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
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  if (!order) return null;

  const handleUpdateStatus = async () => {
    const currentStatus = order.status as OrderStatus;
    const nextStatus = getNextOrderStatus(currentStatus);
    if (!nextStatus) return;

    try {
      await updateOrderStatus({
        orderCode: order.orderCode,
        status: nextStatus,
      }).unwrap();

      toast.success(
        `Đã cập nhật trạng thái đơn hàng thành "${getOrderStatusText(nextStatus)}"`,
      );
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
      console.error("Error updating order status:", error);
    }
  };

  const renderStatusProgress = () => {
    const currentIndex = getOrderStatusIndex(order.status as OrderStatus);
    const statuses = getAllOrderStatuses();

    return (
      <div className="space-y-3">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={status} className="flex items-center gap-3">
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "bg-primary border-primary"
                    : "border-muted-foreground bg-background"
                }`}
              >
                {isCompleted && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {getOrderStatusText(status)}
                </div>
              </div>
              {isCurrent && (
                <Badge
                  variant={getOrderStatusBadgeVariant(status)}
                  className="text-xs"
                >
                  Hiện tại
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    );
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
                <div className="flex items-center gap-2">
                  <Badge
                    className={getOrderStatusColorClasses(
                      order.status as OrderStatus,
                    )}
                    variant="outline"
                  >
                    {getOrderStatusText(order.status as OrderStatus)}
                  </Badge>
                  {canUpdateOrderStatus(order.status as OrderStatus) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleUpdateStatus}
                      disabled={isUpdating}
                      className="h-6 px-2 text-xs"
                    >
                      {isUpdating ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>
                          <ChevronRight className="mr-1 h-3 w-3" />
                          {getOrderStatusText(
                            getNextOrderStatus(order.status as OrderStatus)!,
                          )}
                        </>
                      )}
                    </Button>
                  )}
                </div>
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tiến trình đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>{renderStatusProgress()}</CardContent>
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
