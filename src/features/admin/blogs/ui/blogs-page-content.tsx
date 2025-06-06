"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useBlogsPageContent } from "../hooks/use-blogs-page-content";
import { BlogsDataTable } from "./components/blogs-data-table";
import { CreateBlogModal } from "./components/create-blog-modal";
import { EditBlogModal } from "./components/edit-blog-modal";
import { BlogPreviewDialog } from "./components/blog-preview-dialog";
import { DeleteBlogDialog } from "./components/delete-blog-dialog";

export const BlogsPageContent: React.FC = () => {
  const {
    blogs,
    totalCount,
    isLoading,
    error,
    filters,
    // Modal states
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    editingBlog,
    isPreviewDialogOpen,
    setIsPreviewDialogOpen,
    previewBlog,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deletingBlog,
    // Actions
    handleCreateBlog,
    handleConfirmDelete,
    handleRefresh,
    handleFilterChange,
  } = useBlogsPageContent();

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-red-500">Failed to load blogs</p>
          <p className="text-muted-foreground text-sm">
            {typeof error === "object" && "message" in error
              ? error.message
              : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <Button onClick={handleCreateBlog} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Blog
        </Button>
      </div>
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          {/* Data Table */}
          <BlogsDataTable
            data={blogs}
            totalCount={totalCount}
            isLoading={isLoading}
            filters={filters}
            onFiltersChange={handleFilterChange}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>{" "}
      {/* Modals */}
      <CreateBlogModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={handleRefresh}
      />
      <EditBlogModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        blog={editingBlog}
        onSuccess={handleRefresh}
      />
      <BlogPreviewDialog
        open={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        blog={previewBlog}
      />
      <DeleteBlogDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        blog={deletingBlog}
        onSuccess={handleConfirmDelete}
      />
    </div>
  );
};
