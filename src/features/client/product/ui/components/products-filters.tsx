import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, List, Search } from "lucide-react";

interface ProductsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  onSearch: () => void;
}

export const ProductsFilters = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onSearch,
}: ProductsFiltersProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />{" "}
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && onSearch()}
            className="pl-10"
          />
        </div>{" "}
        <Button onClick={onSearch} variant={"healthy"}>
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm
        </Button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            {" "}
            <span className="shrink-0 text-sm font-medium">Khoảng giá:</span>
            <Input
              placeholder="Tối thiểu"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="min-w-20"
              type="number"
            />
            <span>-</span>
            <Input
              placeholder="Tối đa"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="min-w-20"
              type="number"
            />
          </div>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <span className="text-sm font-medium">Sắp xếp theo:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-40">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Tên (A → Z)</SelectItem>
                <SelectItem value="name-desc">Tên (Z → A)</SelectItem>
                <SelectItem value="price-desc">Giá (Cao đến thấp)</SelectItem>
                <SelectItem value="price-asc">Giá (Thấp đến cao)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Hiển thị:</span>
          <Button
            variant={viewMode === "grid" ? "healthy" : "outline"}
            size="sm"
            className="rounded-sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "healthy" : "outline"}
            size="sm"
            className="rounded-sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
