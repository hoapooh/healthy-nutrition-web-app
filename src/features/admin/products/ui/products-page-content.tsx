"use client";

import React from "react";
import { useGetProductsQuery } from "@/services/product-services";
import { GetProductsParams } from "@/types/product";
import { ProductsDataTable } from "./components/products-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductsPageContent() {
  const [filters, setFilters] = React.useState<GetProductsParams>({
    pageIndex: 1,
    limit: 10,
  });

  const {
    data: productsResponse,
    isLoading,
    refetch,
  } = useGetProductsQuery(filters);

  const products = productsResponse?.result?.items || [];
  const totalCount = productsResponse?.result?.totalCount || 0;

  const handleFiltersChange = (newFilters: GetProductsParams) => {
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
            Sản phẩm
          </h2>
          <p className="text-muted-foreground">
            Quản lý sản phẩm của bạn tại đây.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quản lý sản phẩm</CardTitle>
          <CardDescription>
            Xem, tạo, sửa và xóa sản phẩm. Tổng số: {totalCount} sản phẩm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsDataTable
            data={products}
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
