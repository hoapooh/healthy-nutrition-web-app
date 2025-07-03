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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, ChevronDown, Search, RefreshCw } from "lucide-react";
import { OrderItemHistory, GetAllOrdersParams } from "@/types/order";
import { formatCurrency } from "@/utils/format-currency";
import { DataTablePagination } from "./data-table-pagination";
import { OrderDetailsDrawer } from "./order-details-drawer";

interface TransactionsDataTableProps {
  data: OrderItemHistory[];
  totalCount: number;
  isLoading: boolean;
  filters: GetAllOrdersParams;
  onFiltersChange: (filters: GetAllOrdersParams) => void;
  onRefresh: () => void;
}

export function TransactionsDataTable({
  data,
  totalCount,
  isLoading,
  filters,
  onFiltersChange,
  onRefresh,
}: TransactionsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] =
    React.useState<OrderItemHistory | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "success":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
      case "failed":
        return "destructive";
      case "processing":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "Hoàn thành";
      case "pending":
        return "Đang chờ";
      case "cancelled":
        return "Đã hủy";
      case "failed":
        return "Thất bại";
      case "processing":
        return "Đang xử lý";
      default:
        return status;
    }
  };

  const columns: ColumnDef<OrderItemHistory>[] = [
    {
      id: "orderCode",
      accessorKey: "orderCode",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã đơn hàng
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedOrder(row.original);
            setIsDrawerOpen(true);
          }}
          className="text-primary hover:text-primary/80 cursor-pointer text-left font-mono hover:underline"
        >
          #{row.getValue("orderCode")}
        </button>
      ),
    },
    {
      id: "totalAmount",
      accessorKey: "totalAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tổng tiền
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = row.getValue("totalAmount") as number;
        return <div className="font-medium">{formatCurrency(amount)}</div>;
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={getStatusColor(status)} className="capitalize">
            {getStatusText(status)}
          </Badge>
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
              placeholder="Tìm kiếm theo mã đơn hàng..."
              value={
                (table.getColumn("orderCode")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("orderCode")?.setFilterValue(event.target.value)
              }
              className="max-w-sm pl-8"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Làm mới
          </Button>
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
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
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
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
                  Không có giao dịch nào.
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
      <OrderDetailsDrawer
        order={selectedOrder}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
}
