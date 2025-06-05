import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, ArrowUpDown, Eye } from "lucide-react";
import { Blog, BlogParams } from "@/types/blog";

interface UseBlogsTableProps {
  data: Blog[];
  totalCount: number;
  filters: BlogParams;
  onFiltersChange: (filters: BlogParams) => void;
}

export const useBlogsTable = ({
  data,
  totalCount,
  filters,
  onFiltersChange,
}: UseBlogsTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [editingBlog, setEditingBlog] = React.useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = React.useState<Blog | null>(null);
  const [previewingBlog, setPreviewingBlog] = React.useState<Blog | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const columns: ColumnDef<Blog>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          <Button
            variant="link"
            className="h-auto max-w-[200px] justify-start truncate p-0 text-left font-medium"
            onClick={() => setPreviewingBlog(row.original)}
          >
            {row.getValue("title")}
          </Button>
        </div>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant =
          status === "published"
            ? "default"
            : status === "draft"
              ? "secondary"
              : "outline";
        return (
          <Badge variant={variant} className="capitalize">
            {status}
          </Badge>
        );
      },
    },
    {
      id: "author",
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("author")}</div>
      ),
    },
    {
      id: "excerpt",
      accessorKey: "excerpt",
      header: "Excerpt",
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-[300px] truncate">
          {row.getValue("excerpt")}
        </div>
      ),
    },
    {
      id: "tags",
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[];
        return (
          <div className="flex max-w-[200px] flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const blog = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                onClick={() => setPreviewingBlog(blog)}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => setEditingBlog(blog)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => setDeletingBlog(blog)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / (filters.limit || 10)),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: (filters.pageIndex || 1) - 1, // Convert 1-based pageIndex to 0-based for table
        pageSize: filters.limit || 10,
      },
    },
  });

  // Handle pagination changes - convert 0-based table pageIndex to 1-based API pageIndex
  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    onFiltersChange({
      ...filters,
      pageIndex: pageIndex + 1, // Convert 0-based pageIndex to 1-based for API
      limit: pageSize,
    });
  };

  // Handle search
  const handleSearchChange = (searchValue: string) => {
    onFiltersChange({
      ...filters,
      title: searchValue,
      pageIndex: 1,
    });
  };

  return {
    table,
    columns,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
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
  };
};
