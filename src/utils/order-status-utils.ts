import { OrderStatus } from "@/types/order";

/**
 * Get the next status in the order flow
 */
export function getNextOrderStatus(
  currentStatus: OrderStatus,
): OrderStatus | null {
  switch (currentStatus) {
    case OrderStatus.PENDING:
      return OrderStatus.ACCEPTED;
    case OrderStatus.ACCEPTED:
      return OrderStatus.SHIPPING;
    case OrderStatus.SHIPPING:
      return OrderStatus.SHIPPED;
    case OrderStatus.SHIPPED:
      return null; // Final status
    default:
      return null;
  }
}

/**
 * Get Vietnamese text for order status
 */
export function getOrderStatusText(status: OrderStatus): string {
  switch (status) {
    case "SHIPPED":
      return "Đã giao";
    case "SHIPPING":
      return "Đang giao";
    case "ACCEPTED":
      return "Đã xác nhận";
    case "PENDING":
      return "Đang chờ";
    default:
      return status;
  }
}

/**
 * Get badge variant for order status (for UI components)
 */
export function getOrderStatusBadgeVariant(status: OrderStatus) {
  switch (status) {
    case OrderStatus.SHIPPED:
      return "shipped";
    case OrderStatus.ACCEPTED:
      return "healthy";
    case OrderStatus.PENDING:
    case OrderStatus.SHIPPING:
      return "pending";
    default:
      return "secondary";
  }
}

/**
 * Get color classes for order status (for custom styling)
 */
export function getOrderStatusColorClasses(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.SHIPPED:
      return "shipped";
    case OrderStatus.ACCEPTED:
      return "healthy";
    case OrderStatus.PENDING:
    case OrderStatus.SHIPPING:
      return "pending";
    default:
      return "secondary";
  }
}

/**
 * Check if status update is allowed
 */
export function canUpdateOrderStatus(currentStatus: OrderStatus): boolean {
  return getNextOrderStatus(currentStatus) !== null;
}

/**
 * Get all possible statuses in order
 */
export function getAllOrderStatuses(): OrderStatus[] {
  return [
    OrderStatus.PENDING,
    OrderStatus.ACCEPTED,
    OrderStatus.SHIPPING,
    OrderStatus.SHIPPED,
  ];
}

/**
 * Get status progression index (0-3)
 */
export function getOrderStatusIndex(status: OrderStatus): number {
  const statuses = getAllOrderStatuses();
  return statuses.indexOf(status);
}

/**
 * Check if one status comes after another in the flow
 */
export function isStatusAfter(
  status1: OrderStatus,
  status2: OrderStatus,
): boolean {
  return getOrderStatusIndex(status1) > getOrderStatusIndex(status2);
}
