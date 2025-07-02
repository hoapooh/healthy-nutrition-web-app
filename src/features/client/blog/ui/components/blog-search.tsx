"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const BlogSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/blog/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Tìm kiếm</h2>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Từ khóa tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-12"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default BlogSearch;
