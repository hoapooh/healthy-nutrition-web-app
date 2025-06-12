"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
  currentPage: number; // 0-based pageIndex from table state
  pageSize: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void; // Expects 0-based pageIndex
}

export function DataTablePagination<TData>({
  table,
  totalCount,
  currentPage, // 0-based pageIndex
  pageSize,
  onPaginationChange,
}: DataTablePaginationProps<TData>) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalCount);

  const handlePageSizeChange = (newPageSize: string) => {
    onPaginationChange(0, Number(newPageSize));
  };

  const handlePageChange = (newPage: number) => {
    onPaginationChange(newPage, pageSize);
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {" "}
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} của{" "}
            {table.getFilteredRowModel().rows.length} hàng được chọn.
          </>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Số hàng mỗi trang</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>{" "}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {totalCount > 0 ? (
            <>
              {startItem}-{endItem} của {totalCount}
            </>
          ) : (
            "0 của 0"
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(0)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            {" "}
            <span className="sr-only">Đi đến trang trước</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex shrink-0 items-center justify-center text-sm font-medium">
            Trang {currentPage + 1} của {totalPages || 1}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <span className="sr-only">Đi đến trang tiếp theo</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
