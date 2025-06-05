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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { CategoryParams, CATEGORY_TYPES } from "@/types/category";
import useCategoryFilters from "../../hooks/use-category-filters";

interface CategoryFiltersProps {
  filters: CategoryParams;
  onFiltersChange: (filters: CategoryParams) => void;
}

export function CategoryFilters({
  filters,
  onFiltersChange,
}: CategoryFiltersProps) {
  const {
    localFilters,
    setLocalFilters,
    isOpen,
    setIsOpen,
    hasActiveFilters,
    handleApplyFilters,
    handleClearFilters,
  } = useCategoryFilters({
    filters,
    onFiltersChange,
  });

  console.log(localFilters);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <div className="bg-primary text-primary-foreground ml-2 rounded-full px-2 py-0.5 text-xs">
              {Object.values(filters).filter(Boolean).length - 2}{" "}
              {/* Exclude offset and limit */}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Filter Categories</h4>
            <p className="text-muted-foreground text-sm">
              Set filters to narrow down the results.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type-filter">Type</Label>
              <Select
                value={localFilters.type || "all"}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, type: value || undefined })
                }
              >
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {CATEGORY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description-filter">Description</Label>
              <Input
                id="description-filter"
                placeholder="Filter by description..."
                value={localFilters.description || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    description: e.target.value || undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button size="sm" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
