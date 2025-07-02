"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, List } from "lucide-react";
import { useGetAllBlogsQuery } from "@/services/blog-services";
import { useRouter } from "next/navigation";
import type { Blog } from "@/types/blog";

const BlogSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use the query hook with search term
  const {
    data: searchResults = { result: { items: [], totalCount: 0 } },
    isLoading,
  } = useGetAllBlogsQuery(
    { searchTerm: debouncedSearchTerm, limit: 5 },
    { skip: !debouncedSearchTerm.trim() },
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.trim().length > 0);
  };

  const handleResultClick = (slug: string) => {
    router.push(`/blog/${slug}`);
    setShowResults(false);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Tìm kiếm</h2>
      <div className="search-container relative">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Từ khóa tìm kiếm..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pr-20"
          />
          <div className="absolute top-1/2 right-1 flex -translate-y-1/2 space-x-1">
            {searchTerm && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={clearSearch}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Đang tìm kiếm...
                </div>
              ) : searchResults.result.items.length > 0 ? (
                <>
                  <div className="border-b p-2 text-xs font-medium text-gray-500 uppercase">
                    Kết quả tìm kiếm ({searchResults.result.totalCount})
                  </div>
                  {searchResults.result.items.map((blog: Blog) => (
                    <button
                      key={blog.id}
                      onClick={() => handleResultClick(blog.slug)}
                      className="w-full border-b border-gray-100 p-3 text-left last:border-b-0 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      <div className="truncate text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {blog.excerpt}
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-400">
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                        {blog.tags.length > 0 && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{blog.tags.slice(0, 2).join(", ")}</span>
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                  {searchResults.result.totalCount > 5 && (
                    <button
                      onClick={() => {
                        router.push(
                          `/blog/search?q=${encodeURIComponent(searchTerm)}`,
                        );
                        setShowResults(false);
                      }}
                      className="w-full border-t p-3 text-center text-sm font-medium text-green-600 hover:bg-green-50"
                    >
                      Xem tất cả {searchResults.result.totalCount} kết quả
                    </button>
                  )}
                </>
              ) : debouncedSearchTerm.trim() ? (
                <div className="p-4 text-center text-gray-500">
                  Không tìm thấy bài viết nào phù hợp với &quot;
                  {debouncedSearchTerm}
                  &quot;
                </div>
              ) : null}
            </div>
          )}
        </form>

        {/* Back to All Posts Button */}
        <div className="mt-4">
          <Button
            onClick={() => router.push("/blog")}
            variant="outline"
            size="sm"
            className="w-full justify-center text-sm"
          >
            <List className="mr-2 h-4 w-4" />
            Xem tất cả bài viết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;
