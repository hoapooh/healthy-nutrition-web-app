"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, RotateCcw, X } from "lucide-react";
import { GetProductsParams } from "@/types/product";
import { useGetAllCategoriesQuery } from "@/services/category-services";

interface ProductFiltersProps {
  filters: GetProductsParams;
  onFiltersChange: (filters: GetProductsParams) => void;
}

export function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const { data: categoriesResponse } = useGetAllCategoriesQuery({
    limit: 100, // Get all categories for filter
  });

  const categories = categoriesResponse?.result?.items || [];

  const hasActiveFilters = Boolean(
    filters.categoryIds?.length ||
      filters.brand ||
      filters.tags?.length ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.minStockQuantity ||
      filters.maxStockQuantity,
  );

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: filters.searchTerm,
      pageIndex: 1,
      limit: filters.limit,
    });
  };

  // TODO: need to check if this is needed or not
  /* const removeFilter = (filterKey: keyof GetProductsParams) => {
    onFiltersChange({
      ...filters,
      [filterKey]: undefined,
      pageIndex: 1,
    });
  }; */

  const resetToDefault = () => {
    onFiltersChange({
      pageIndex: 1,
      limit: 10, // Default limit
    });
  };

  const addCategoryFilter = (categoryId: string) => {
    const currentCategories = filters.categoryIds || [];
    if (!currentCategories.includes(categoryId)) {
      onFiltersChange({
        ...filters,
        categoryIds: [...currentCategories, categoryId],
        pageIndex: 1,
      });
    }
  };

  const removeCategoryFilter = (categoryId: string) => {
    const currentCategories = filters.categoryIds || [];
    onFiltersChange({
      ...filters,
      categoryIds: currentCategories.filter((id) => id !== categoryId),
      pageIndex: 1,
    });
  };

  const addTagFilter = (tag: string) => {
    const currentTags = filters.tags || [];
    if (!currentTags.includes(tag) && tag.trim()) {
      onFiltersChange({
        ...filters,
        tags: [...currentTags, tag.trim()],
        pageIndex: 1,
      });
    }
  };

  const removeTagFilter = (tag: string) => {
    const currentTags = filters.tags || [];
    onFiltersChange({
      ...filters,
      tags: currentTags.filter((t) => t !== tag),
      pageIndex: 1,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 rounded-full p-0"
              >
                {[
                  filters.categoryIds?.length || 0,
                  filters.brand ? 1 : 0,
                  filters.tags?.length || 0,
                  filters.minPrice ? 1 : 0,
                  filters.maxPrice ? 1 : 0,
                  filters.minStockQuantity ? 1 : 0,
                  filters.maxStockQuantity ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-80" align="start">
          <div className="grid w-full gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Lọc sản phẩm</h4>
              <p className="text-muted-foreground text-sm">
                Đặt bộ lọc để thu hẹp kết quả tìm kiếm.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="brand">Thương hiệu</Label>
                <Input
                  id="brand"
                  placeholder="Nhập thương hiệu"
                  value={filters.brand || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      brand: e.target.value || undefined,
                      pageIndex: 1,
                    })
                  }
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="category">Danh mục</Label>
                <Select onValueChange={(value) => addCategoryFilter(value)}>
                  <SelectTrigger className="col-span-2 h-8">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {filters.categoryIds && filters.categoryIds.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.categoryIds.map((categoryId) => {
                    const category = categories.find(
                      (c) => c.id === categoryId,
                    );
                    return (
                      <Badge
                        key={categoryId}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category?.name || categoryId}
                        <button
                          onClick={() => removeCategoryFilter(categoryId)}
                          className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="tags">Thẻ</Label>
                <Input
                  id="tags"
                  placeholder="Thêm thẻ"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTagFilter(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                  className="col-span-2 h-8"
                />
              </div>
              {filters.tags && filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <button
                        onClick={() => removeTagFilter(tag)}
                        className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Khoảng giá</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Giá tối thiểu"
                  type="number"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      minPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                      pageIndex: 1,
                    })
                  }
                  className="h-8"
                />
                <Input
                  placeholder="Giá tối đa"
                  type="number"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      maxPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                      pageIndex: 1,
                    })
                  }
                  className="h-8"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Khoảng số lượng tồn kho</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Tồn kho tối thiểu"
                  type="number"
                  value={filters.minStockQuantity || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      minStockQuantity: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                      pageIndex: 1,
                    })
                  }
                  className="h-8"
                />
                <Input
                  placeholder="Tồn kho tối đa"
                  type="number"
                  value={filters.maxStockQuantity || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      maxStockQuantity: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                      pageIndex: 1,
                    })
                  }
                  className="h-8"
                />
              </div>
            </div>
            {hasActiveFilters && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                className="h-8 px-2 lg:px-3"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Reset Button - This will appear outside the popover for easy access */}

      <Button
        onClick={resetToDefault}
        variant="outline"
        size="sm"
        className="h-8 px-2 lg:px-3"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
