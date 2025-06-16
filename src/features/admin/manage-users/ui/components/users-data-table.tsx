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
import { User, GetAllUsersParams } from "@/types/auth";
import { CreateUserModal, DataTablePagination, UserDetailsDrawer } from "./";

interface UsersDataTableProps {
  data: User[];
  totalCount: number;
  isLoading: boolean;
  filters: GetAllUsersParams;
  onFiltersChange: (filters: GetAllUsersParams) => void;
  onRefresh: () => void;
}

export function UsersDataTable({
  data,
  totalCount,
  isLoading,
  filters,
  onFiltersChange,
  onRefresh,
}: UsersDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  // TODO: Implement editing and deleting user functionality but later
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [_editingUser, setEditingUser] = React.useState<User | null>(null);
  const [_deletingUser, setDeletingUser] = React.useState<User | null>(null);

  const columns: ColumnDef<User>[] = [
    {
      id: "fullName",
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Họ và tên
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("fullName")}</div>
      ),
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedUser(row.original);
            setIsDrawerOpen(true);
          }}
          className="text-muted-foreground hover:text-primary cursor-pointer text-left hover:underline"
        >
          {row.getValue("email")}
        </button>
      ),
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Vai trò
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge
            variant={role === "Admin" ? "default" : "secondary"}
            className="capitalize"
          >
            {role}
          </Badge>
        );
      },
    },
    {
      id: "phoneNumber",
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {row.getValue("phoneNumber") || "N/A"}
        </div>
      ),
    },
    {
      id: "address",
      accessorKey: "address",
      header: "Địa chỉ",
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-[200px] truncate">
          {row.getValue("address") || "N/A"}
        </div>
      ),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return (
          <div className="text-muted-foreground">
            {date ? new Date(date).toLocaleDateString() : "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

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
                onClick={() => setEditingUser(user)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => setDeletingUser(user)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
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
              placeholder="Tìm kiếm người dùng..."
              value={
                (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("fullName")?.setFilterValue(event.target.value)
              }
              className="max-w-sm pl-8"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Cột <ChevronDown className="ml-2 h-4 w-4" />
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
                      {column.id === "fullName"
                        ? "Họ và tên"
                        : column.id === "phoneNumber"
                          ? "Số điện thoại"
                          : column.id === "createdAt"
                            ? "Ngày tạo"
                            : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo người dùng
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
                  Đang tải...
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
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        totalCount={totalCount}
        currentPage={(filters.pageIndex || 1) - 1} // Convert 1-based pageIndex to 0-based for pagination component
        pageSize={filters.limit || 10}
        onPaginationChange={handlePaginationChange}
      />
      <CreateUserModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={onRefresh}
      />
      <UserDetailsDrawer
        user={selectedUser}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
}
