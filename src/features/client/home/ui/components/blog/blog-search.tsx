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
    // TODO: Implement search functionality
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Search Blog</h2>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search Keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute top-0 right-0 h-full"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default BlogSearch;
