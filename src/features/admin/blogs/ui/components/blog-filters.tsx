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
import { BlogParams, BLOG_STATUSES } from "@/types/blog";
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
          Filters
          {hasActiveFilters && (
            <div className="bg-primary text-primary-foreground ml-2 rounded-full px-2 py-0.5 text-xs">
              {Object.values(filters).filter(Boolean).length - 2}{" "}
              {/* Exclude pageIndex and limit */}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-medium leading-none font-medium">Filters</h4>
            <p className="text-muted-foreground text-sm">
              Filter blogs by status, author, and tags.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <Select
                value={localFilters.status || "all"}
                onValueChange={(value) => {
                  setLocalFilters({
                    ...localFilters,
                    status:
                      value === "all"
                        ? undefined
                        : (value as "draft" | "published" | "archived"),
                  });
                }}
              >
                <SelectTrigger id="status" className="col-span-2 h-8">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {BLOG_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Author name"
                value={localFilters.author || ""}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, author: e.target.value })
                }
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
