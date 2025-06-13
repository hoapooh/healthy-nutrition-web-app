"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Settings2 } from "lucide-react";
import { Blog, BlogParams } from "@/types/blog";
import { useBlogsTable } from "../../hooks/use-blogs-table";
import { BlogFilters } from "./blog-filters";
import { CreateBlogModal } from "./create-blog-modal";
import { BlogPreviewDialog } from "./blog-preview-dialog";
import { EditBlogModal } from ".//edit-blog-modal";
import { DeleteBlogDialog } from "./delete-blog-dialog";
import { DataTablePagination } from "./data-table-pagination";

interface BlogsDataTableProps {
  data: Blog[];
  totalCount: number;
  isLoading: boolean;
  filters: BlogParams;
  onFiltersChange: (filters: BlogParams) => void;
  onRefresh: () => void;
}

export function BlogsDataTable({
  data,
  totalCount,
  isLoading,
  filters,
  onFiltersChange,
  onRefresh,
}: BlogsDataTableProps) {
  const {
    table,
    columns,
    editingBlog,
    setEditingBlog,
    deletingBlog,
    setDeletingBlog,
    previewingBlog,
    setPreviewingBlog,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handlePaginationChange,
    handleSearchChange,
  } = useBlogsTable({
    data,
    totalCount,
    filters,
    onFiltersChange,
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Tìm kiếm blog..."
              value={filters.title || ""}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="w-[250px] pl-9 lg:w-[300px]"
            />
          </div>
          <BlogFilters filters={filters} onFiltersChange={onFiltersChange} />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Settings2 className="mr-2 h-4 w-4" />
                Hiển thị
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Blog
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === "function"
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Đang tải blog...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        table={table}
        totalCount={totalCount}
        onPaginationChange={handlePaginationChange}
      />

      {/* Modals */}
      <CreateBlogModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={onRefresh}
      />

      <BlogPreviewDialog
        blog={previewingBlog}
        open={!!previewingBlog}
        onOpenChange={(open) => !open && setPreviewingBlog(null)}
      />

      <EditBlogModal
        blog={editingBlog}
        open={!!editingBlog}
        onOpenChange={(open) => !open && setEditingBlog(null)}
        onSuccess={onRefresh}
      />

      <DeleteBlogDialog
        blog={deletingBlog}
        open={!!deletingBlog}
        onOpenChange={(open) => !open && setDeletingBlog(null)}
        onSuccess={onRefresh}
      />
    </div>
  );
}
