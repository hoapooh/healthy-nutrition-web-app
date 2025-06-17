"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { BlogParams } from "@/types/blog";
import { useBlogFilters } from "../../hooks/use-blog-filters";

interface BlogFiltersProps {
  filters: BlogParams;
  onFiltersChange: (filters: BlogParams) => void;
}

export function BlogFilters({ filters, onFiltersChange }: BlogFiltersProps) {
  const {
    localFilters,
    setLocalFilters,
    isOpen,
    setIsOpen,
    hasActiveFilters,
    handleApplyFilters,
    handleClearFilters,
  } = useBlogFilters({
    filters,
    onFiltersChange,
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          Bộ lọc{" "}
          {hasActiveFilters && (
            <div className="bg-primary text-primary-foreground ml-2 rounded-full px-2 py-0.5 text-xs">
              {(filters.tags?.length || 0) +
                (filters.startDate ? 1 : 0) +
                (filters.endDate ? 1 : 0)}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          {" "}
          <div className="space-y-2">
            <h4 className="text-medium leading-none font-medium">Bộ lọc</h4>
            <p className="text-muted-foreground text-sm">
              Lọc bài viết theo thẻ và khoảng thời gian.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tags">Thẻ</Label>
              <Input
                id="tags"
                placeholder="Nhập thẻ (cách nhau bằng dấu phẩy)"
                value={localFilters.tags?.join(", ") || ""}
                onChange={(e) => {
                  const tags = e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);
                  setLocalFilters({ ...localFilters, tags });
                }}
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} size="sm" className="flex-1">
              Apply Filters
            </Button>
            <Button
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
