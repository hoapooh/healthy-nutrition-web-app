"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductsQuery } from "@/services/product-services";
import { Separator } from "@/components/ui/separator";
import { GetProductsParams } from "@/types/product";
import { sortProducts, SortOption } from "@/utils/sort-products";
import {
  ProductsHeader,
  ProductsFilters,
  ProductsGrid,
  ProductsPagination,
  ProductsCategorySidebar,
} from "@/features/client/product/ui/components";

const ProductsClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize state from URL parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name-asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
  ); // Update state when URL parameters change
  useEffect(() => {
    setIsHydrated(true);

    setSearchTerm(searchParams.get("search") || "");
    setViewMode((searchParams.get("view") as "grid" | "list") || "grid");
    setSortBy(searchParams.get("sort") || "name-asc");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSelectedCategoryId(searchParams.get("categoryId") || "");
    setCurrentPage(parseInt(searchParams.get("page") || "1"));

    updateSearchParams({
      search: searchParams.get("search") || "",
      view: (searchParams.get("view") as "grid" | "list") || "grid",
      sort: searchParams.get("sort") || "name-asc",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      categoryId: searchParams.get("categoryId") || null,
      page: parseInt(searchParams.get("page") || "1"),
    });
  }, [searchParams, updateSearchParams]);

  const queryParams: GetProductsParams = {
    searchTerm: searchTerm || undefined,
    categoryIds: selectedCategoryId ? [selectedCategoryId] : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    pageIndex: currentPage,
    limit: pageSize,
  };

  const { data, isLoading, error } = useGetProductsQuery(queryParams, {
    skip: !isHydrated, // Skip query until component is hydrated
    refetchOnMountOrArgChange: true, // Refetch when arguments change
  });

  // Client-side sorting of products
  const sortedProducts = useMemo(() => {
    const products = data?.result?.items || [];
    return sortProducts(products, sortBy as SortOption);
  }, [data?.result?.items, sortBy]);

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
          {" "}
          <ProductsGrid
            products={sortedProducts}
            viewMode={viewMode}
            isLoading={isLoading}
            error={error}
          />
          {/* Pagination */}
          {sortedProducts.length > 0 && !isLoading && !error && (
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

export default ProductsClient;
