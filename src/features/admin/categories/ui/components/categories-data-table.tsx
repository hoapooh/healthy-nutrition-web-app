"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  MoreHorizontal,
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import { Category, CategoryParams } from "@/types/category";
import {
  CategoryFilters,
  CreateCategoryModal,
  EditCategoryModal,
  DeleteCategoryDialog,
  DataTablePagination,
} from "./";

interface CategoriesDataTableProps {
  data: Category[];
  totalCount: number;
  isLoading: boolean;
  filters: CategoryParams;
  onFiltersChange: (filters: CategoryParams) => void;
  onRefresh: () => void;
}

export function CategoriesDataTable({
  data,
  totalCount,
  isLoading,
  filters,
  onFiltersChange,
  onRefresh,
}: CategoriesDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(
    null,
  );
  const [deletingCategory, setDeletingCategory] =
    React.useState<Category | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const columns: ColumnDef<Category>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-[200px] truncate">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

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
                onClick={() => setEditingCategory(category)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => setDeletingCategory(category)}
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={filters.name || ""}
              onChange={(event) =>
                onFiltersChange({
                  ...filters,
                  name: event.target.value,
                  pageIndex: 1,
                })
              }
              className="max-w-sm pl-8"
            />
          </div>
          <CategoryFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
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
                  Loading...
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>{" "}
      <DataTablePagination
        table={table}
        totalCount={totalCount}
        currentPage={(filters.pageIndex || 1) - 1} // Convert 1-based pageIndex to 0-based for pagination component
        pageSize={filters.limit || 10}
        onPaginationChange={handlePaginationChange}
      />
      <CreateCategoryModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={onRefresh}
      />
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open: boolean) => !open && setEditingCategory(null)}
          onSuccess={onRefresh}
        />
      )}
      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={(open: boolean) => !open && setDeletingCategory(null)}
          onSuccess={onRefresh}
        />
      )}
    </div>
  );
}
