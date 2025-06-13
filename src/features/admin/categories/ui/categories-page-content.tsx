"use client";

import React from "react";
import { CategoriesDataTable } from "./components/categories-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCategoriesPageContent from "../hooks/use-categories-page-content";

export default function CategoriesPageContent() {
  const {
    categories,
    filters,
    handleFiltersChange,
    handleRefresh,
    isLoading,
    totalCount,
  } = useCategoriesPageContent();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-primary text-3xl font-bold tracking-tight">
            Danh mục
          </h2>
          <p className="text-muted-foreground">
            Quản lý danh mục sản phẩm của bạn tại đây.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quản lý danh mục</CardTitle>
          <CardDescription>
            Xem, tạo, chỉnh sửa và xóa danh mục sản phẩm. Tổng cộng:
            {totalCount} danh mục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoriesDataTable
            data={categories}
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
