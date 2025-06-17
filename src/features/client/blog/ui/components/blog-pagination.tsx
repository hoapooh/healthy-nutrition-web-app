import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

const BlogPagination = ({
  currentPage,
  totalPages,
  baseUrl = "/blog",
}: BlogPaginationProps) => {
  const getPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Số trang hiển thị tối đa

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    // Điều chỉnh startPage nếu endPage đã đạt tối đa
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link key={i} href={getPageUrl(i)}>
          <Button
            variant={i === currentPage ? "default" : "outline"}
            size="sm"
            className={
              i === currentPage ? "bg-green-600 hover:bg-green-700" : ""
            }
          >
            {i}
          </Button>
        </Link>,
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Trước đó
          </Button>
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            Tiếp theo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default BlogPagination;
