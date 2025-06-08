"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface OrderHistoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const OrderHistoryPagination: React.FC<OrderHistoryPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            className="min-w-[32px]"
          >
            {i}
          </Button>,
        );
      }
    } else {
      // Show ellipsis for many pages
      pages.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
          className="min-w-[32px]"
        >
          1
        </Button>,
      );

      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis-start" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </span>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            className="min-w-[32px]"
          >
            {i}
          </Button>,
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis-end" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </span>,
        );
      }

      if (totalPages > 1) {
        pages.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className="min-w-[32px]"
          >
            {totalPages}
          </Button>,
        );
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} orders
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">{renderPageNumbers()}</div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
