"use client";

import { ArrowUpDown, ChevronDown, RefreshCw, Search } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpdateOrderStatusMutation } from "@/services/order-services";
import {
  GetAllOrdersParams,
  OrderItemHistory,
  OrderStatus,
} from "@/types/order";
import { formatCurrency } from "@/utils/format-currency";
import {
  getAllOrderStatuses,
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/utils/order-status-utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

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
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus>(
    OrderStatus.PENDING,
  );
  const [updateOrderStatus, { isLoading: isBulkUpdating }] =
    useUpdateOrderStatusMutation();

  // Sync statusFilter with filters.status from parent
  React.useEffect(() => {
    if (filters.status && filters.status !== statusFilter) {
      setStatusFilter(filters.status);
    }
  }, [filters.status]);

  // Notify parent component when status filter changes
  React.useEffect(() => {
    if (filters.status !== statusFilter) {
      onFiltersChange({
        ...filters,
        status: statusFilter,
        pageIndex: 1, // Reset to first page when changing status
      });
    }
  }, [statusFilter, filters.status]);

  // Bulk status update handler
  const handleBulkStatusUpdate = async (newStatus: OrderStatus) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      toast.error("Vui lòng chọn ít nhất một đơn hàng");
      return;
    }

    try {
      const updatePromises = selectedRows.map((row) =>
        updateOrderStatus({
          orderCode: row.original.orderCode,
          status: newStatus,
        }).unwrap(),
      );

      await Promise.all(updatePromises);

      toast.success(
        `Đã cập nhật ${selectedRows.length} đơn hàng thành "${getOrderStatusText(newStatus)}"`,
      );
      setRowSelection({});
      onRefresh();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
      console.error("Error bulk updating order status:", error);
    }
  };

  const columns: ColumnDef<OrderItemHistory>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "orderCode",
      accessorKey: "orderCode",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
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
      filterFn: (row, id, value) => {
        // Convert orderCode (number) to string for comparison
        const orderCodeString = row.getValue(id)?.toString() || "";
        return orderCodeString.includes(value);
      },
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
          <Badge
            variant={getOrderStatusBadgeVariant(status as OrderStatus)}
            className="capitalize"
          >
            {getOrderStatusText(status as OrderStatus)}
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
      {/* Bulk Actions */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="bg-muted/50 mb-4 flex items-center gap-2 rounded-lg p-4">
          <span className="text-muted-foreground text-sm">
            Đã chọn {Object.keys(rowSelection).length} đơn hàng
          </span>
          <div className="flex gap-2">
            {getAllOrderStatuses().map((status) => (
              <Button
                key={status}
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate(status)}
                disabled={isBulkUpdating}
              >
                Chuyển thành {getOrderStatusText(status)}
              </Button>
            ))}
          </div>
        </div>
      )}

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Trạng thái: {getOrderStatusText(statusFilter)}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {getAllOrderStatuses().map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter === status}
                  onCheckedChange={() => setStatusFilter(status)}
                >
                  <Badge
                    variant={getOrderStatusBadgeVariant(status)}
                    className="mr-2"
                  >
                    {getOrderStatusText(status)}
                  </Badge>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
