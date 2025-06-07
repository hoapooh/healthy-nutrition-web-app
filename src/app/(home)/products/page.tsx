"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductsQuery } from "@/services/product-services";
import { Separator } from "@/components/ui/separator";
import { GetProductsParams } from "@/types/product";
import {
  ProductsHeader,
  ProductsFilters,
  ProductsGrid,
  ProductsPagination,
  ProductsCategorySidebar,
} from "@/features/client/product/ui/components";

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    (searchParams.get("view") as "grid" | "list") || "grid",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchParams.get("categoryId") || "",
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const [pageSize] = useState(12);

  // Update URL when state changes
  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });

      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );
  // Update state when URL parameters change
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setViewMode((searchParams.get("view") as "grid" | "list") || "grid");
    setSortBy(searchParams.get("sort") || "name");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSelectedCategoryId(searchParams.get("categoryId") || "");
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);
  const queryParams: GetProductsParams = {
    searchTerm: searchTerm || undefined,
    categoryIds: selectedCategoryId ? [selectedCategoryId] : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    pageIndex: currentPage,
    limit: pageSize,
  };

  const { data, isLoading, error } = useGetProductsQuery(queryParams);

  const products = data?.result?.items || [];
  const totalCount = data?.result?.totalCount || 0;

  const handleSearch = () => {
    /* updateSearchParams({
      search: searchTerm,
      page: 1, // Reset to first page when searching
    });
    setCurrentPage(1); */
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    updateSearchParams({
      search: value,
      page: 1, // Reset to first page when searching
    });
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    updateSearchParams({ view: mode });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateSearchParams({ sort: value });
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    updateSearchParams({ minPrice: value || null });
  };
  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    updateSearchParams({ maxPrice: value || null });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId || "");
    updateSearchParams({
      categoryId: categoryId || null,
      page: 1, // Reset to first page when changing category
    });
    setCurrentPage(1);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsHeader />
      <ProductsFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
        viewMode={viewMode}
        setViewMode={handleViewModeChange}
        sortBy={sortBy}
        setSortBy={handleSortChange}
        minPrice={minPrice}
        setMinPrice={handleMinPriceChange}
        maxPrice={maxPrice}
        setMaxPrice={handleMaxPriceChange}
        onSearch={handleSearch}
      />
      <Separator className="mb-6" />
      {/* Main content with sidebar layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Category Sidebar */}
        <div className="relative w-full lg:w-64 lg:flex-shrink-0">
          <ProductsCategorySidebar
            selectedCategoryId={selectedCategoryId || undefined}
            onCategorySelect={handleCategoryChange}
          />
        </div>

        {/* Products Content */}
        <div className="min-w-0 flex-1">
          <ProductsGrid
            products={products}
            viewMode={viewMode}
            isLoading={isLoading}
            error={error}
          />

          {/* Pagination */}
          {products.length > 0 && !isLoading && !error && (
            <ProductsPagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
