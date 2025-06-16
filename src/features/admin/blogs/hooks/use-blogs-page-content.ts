import { useGetAllBlogsQuery } from "@/services/blog-services";
import { BlogParams, Blog } from "@/types/blog";
import React from "react";

export const useBlogsPageContent = () => {
  // State for filters and pagination
  const [filters, setFilters] = React.useState<BlogParams>({
    pageIndex: 1,
    limit: 10,
  });

  const [searchQuery, setSearchQuery] = React.useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingBlog, setEditingBlog] = React.useState<Blog | null>(null);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = React.useState(false);
  const [previewBlog, setPreviewBlog] = React.useState<Blog | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingBlog, setDeletingBlog] = React.useState<Blog | null>(null);

  // API query
  const {
    data: blogsResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllBlogsQuery(filters);

  const blogs = blogsResponse?.result?.items || [];
  const totalCount = blogsResponse?.result?.totalCount || 0;

  // Filter handlers
  const handleFilterChange = (newFilters: BlogParams) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      pageIndex: 1,
      limit: 10,
    });
    setSearchQuery("");
  };

  // Pagination handlers
  const handlePageChange = (pageIndex: number) => {
    setFilters((prev) => ({ ...prev, pageIndex: pageIndex + 1 }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setFilters((prev) => ({ ...prev, limit: pageSize, pageIndex: 1 }));
  };

  // Sorting handlers
  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  // Blog action handlers
  const handleCreateBlog = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditModalOpen(true);
  };

  const handlePreviewBlog = (blog: Blog) => {
    setPreviewBlog(blog);
    setIsPreviewDialogOpen(true);
  };

  const handleDeleteBlog = (blog: Blog) => {
    setDeletingBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeletingBlog(null);
    refetch();
  };

  const handleRefresh = () => {
    refetch();
  };

  // Update search query filter
  /*   React.useEffect(() => {
    if (searchQuery) {
      setFilters((prev) => ({ ...prev, title: searchQuery, pageIndex: 1 }));
    } else {
      setFilters((prev) => {
        const { ...rest } = prev;
        return rest;
      });
    }
  }, [searchQuery]); */

  return {
    // Data
    blogs,
    totalCount,
    isLoading,
    error,
    filters,

    // Pagination and sorting
    pagination: {
      pageIndex: (filters.pageIndex || 1) - 1,
      pageSize: filters.limit || 10,
    },
    /* sorting: {
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    },
 */
    // Search
    searchQuery,
    setSearchQuery,

    // Filter handlers
    handleFilterChange,
    resetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,

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
    handleEditBlog,
    handlePreviewBlog,
    handleDeleteBlog,
    handleConfirmDelete,
    handleRefresh,
  };
};
