"use client";

import { useState } from "react";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorMessage from "@/components/ui/error-message";
import ProductCard from "@/features/shared/ui/components/product-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from "@/features/client/products/hooks/use-products";
import {
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
  PRICE_RANGES,
} from "@/lib/constants";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const {
    products,
    loading,
    error,
    filter,
    updateFilter,
    resetFilter,
    totalCount,
    filteredCount,
  } = useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          title="Failed to load products"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
          Health Products
        </h1>
        <p className="text-xl text-gray-600">
          Discover our complete range of premium health and wellness products
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="space-y-6 lg:w-64">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
              <Filter className="h-5 w-5" />
              Filters
            </h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-900">Categories</h4>
              <div className="space-y-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Label
                    key={category}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Checkbox
                      checked={filter.category === category}
                      onCheckedChange={() => updateFilter({ category })}
                    />
                    {category}
                  </Label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="mb-3 font-medium text-gray-900">Price Range</h4>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <Label
                    key={range.label}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Checkbox
                      checked={filter.priceRanges.includes(range.label)}
                      onCheckedChange={(checked) => {
                        const newRanges = checked
                          ? [...filter.priceRanges, range.label]
                          : filter.priceRanges.filter((r) => r !== range.label);
                        updateFilter({ priceRanges: newRanges });
                      }}
                    />
                    {range.label}
                  </Label>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={resetFilter}
            >
              Reset Filters
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <div className="text-gray-600">
              Showing {filteredCount} of {totalCount} products
            </div>
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Sort by: </span>
                    <span className="font-medium">
                      {
                        SORT_OPTIONS.find(
                          (option) => option.value === filter.sortBy,
                        )?.label
                      }
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => updateFilter({ sortBy: option.value })}
                      className={
                        filter.sortBy === option.value
                          ? "bg-green-50 text-green-600"
                          : ""
                      }
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {products.length === 0 ? (
            <div className="rounded-lg border bg-white py-12 text-center shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No products found
              </h3>
              <p className="mb-4 text-gray-600">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={resetFilter}>Reset Filters</Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
