import React from "react";
import { BlogsPageContent } from "@/features/admin/blogs/ui/blogs-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Management",
  description:
    "Create, edit, and manage your blog posts effectively and efficiently.",
};

export default function BlogsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <BlogsPageContent />
          </div>
        </div>
      </div>
    </div>
  );
}
