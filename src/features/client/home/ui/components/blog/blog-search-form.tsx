"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const BlogSearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (searchTerm.trim()) {
      current.set("q", searchTerm.trim());
    } else {
      current.delete("q");
    }

    // Reset to page 1 when searching
    current.delete("page");

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/blog${query}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("q");
    current.delete("page");

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/blog${query}`);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search articles, recipes, ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-20"
        />
        <div className="absolute top-1/2 right-1 flex -translate-y-1/2 gap-1">
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
          <Button type="submit" size="icon" variant="ghost" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {searchParams.get("q") && (
        <div className="mt-3 rounded-lg bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            <strong>Search results for:</strong> "{searchParams.get("q")}"
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogSearchForm;
