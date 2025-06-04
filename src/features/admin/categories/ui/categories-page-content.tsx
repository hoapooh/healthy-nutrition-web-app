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
