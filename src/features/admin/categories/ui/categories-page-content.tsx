"use client";

import React from "react";
import { useGetAllCategoriesQuery } from "@/services/category-services";
import { CategoryParams } from "@/types/category";
import { CategoriesDataTable } from "./components/categories-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CategoriesPageContent() {
  const [filters, setFilters] = React.useState<CategoryParams>({
    pageIndex: 1,
    limit: 10,
  });

  const {
    data: categoriesResponse,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery(filters);

  const categories = categoriesResponse?.result?.items || [];
  const totalCount = categoriesResponse?.result?.totalCount || 0;

  const handleFiltersChange = (newFilters: CategoryParams) => {
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
            Categories
          </h2>
          <p className="text-muted-foreground">
            Manage your product categories here.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories Management</CardTitle>
          <CardDescription>
            View, create, edit, and delete product categories. Total:{" "}
            {totalCount} categories
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
