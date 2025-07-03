"use client";

import React from "react";
import { useGetAllOrdersQuery } from "@/services/order-services";
import { GetAllOrdersParams } from "@/types/order";
import { TransactionsDataTable } from "./components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ManageTransactionsPageContent() {
  const [filters, setFilters] = React.useState<GetAllOrdersParams>({
    pageIndex: 1,
    limit: 10,
  });

  const {
    data: ordersResponse,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery(filters);

  const orders = ordersResponse?.items || [];
  const totalCount = ordersResponse?.totalCount || 0;

  const handleFiltersChange = (newFilters: GetAllOrdersParams) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-primary text-3xl font-bold tracking-tight">
            Quản lý giao dịch
          </h2>
          <p className="text-muted-foreground">
            Xem và quản lý tất cả các giao dịch đơn hàng trong hệ thống.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quản lý giao dịch</CardTitle>
          <CardDescription>
            Xem thông tin chi tiết về các đơn hàng và giao dịch. Tổng số:{" "}
            {totalCount}
            giao dịch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionsDataTable
            data={orders}
            totalCount={totalCount}
            isLoading={isLoading}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>
    </div>
  );
}
