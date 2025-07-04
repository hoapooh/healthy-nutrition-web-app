"use client";

import React from "react";
import { useAuth } from "@/store/hooks/use-auth";
import { useOrderHistory } from "@/features/client/order-history/hooks/use-order-history";
import {
  EmptyOrderHistory,
  OrderHistoryList,
  // OrderHistoryPagination, // Commented out since pagination is removed
} from "@/features/client/order-history/ui/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { History, Loader2 } from "lucide-react";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";

const OrderHistory = () => {
  const { isLoading: authLoading } = useAuth();
  const { orders, isLoading, error, pagination } = useOrderHistory();

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth redirectTo="/" allowedRoles={["User"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-7xl min-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <History className="h-8 w-8" />
              Lịch sử đơn hàng
            </h1>
            <p className="text-muted-foreground mt-2">
              Xem và theo dõi tất cả các đơn hàng trước đây của bạn
            </p>
          </div>
          <Separator className="mb-8" />
          {/* Error State */}
          {error && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-center text-red-600">
                  <p className="font-semibold">Lỗi khi tải đơn hàng</p>
                  <p className="mt-1 text-sm">
                    Không thể tải lịch sử đơn hàng của bạn. Vui lòng thử lại
                    sau.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Main Content */}
          {!error && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-bold text-green-600">
                    Đơn hàng của bạn
                  </span>
                  {pagination.totalItems > 0 && (
                    <span className="text-muted-foreground text-sm font-normal">
                      <span className="font-semibold text-green-600">
                        {pagination.totalItems}
                      </span>{" "}
                      đơn hàng
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-2">
                            <div className="h-4 w-24 rounded bg-gray-200"></div>
                            <div className="h-3 w-32 rounded bg-gray-200"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-gray-200"></div>
                            <div className="h-6 w-16 rounded bg-gray-200"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <EmptyOrderHistory />
                ) : (
                  <>
                    <OrderHistoryList orders={orders} />
                    {/* Pagination removed since useGetOrderByUserQuery returns all data */}
                    {/* {pagination.totalPages > 1 && (
                      <div className="mt-8">
                        <OrderHistoryPagination
                          currentPage={pagination.currentPage}
                          totalPages={pagination.totalPages}
                          totalItems={pagination.totalItems}
                          onPageChange={pagination.goToPage}
                          hasNextPage={pagination.hasNextPage}
                          hasPrevPage={pagination.hasPrevPage}
                        />
                      </div>
                    )} */}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrderHistory;
