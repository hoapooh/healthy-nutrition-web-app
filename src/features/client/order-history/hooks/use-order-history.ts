"use client";

import { useState } from "react";
import {
  useGetAllOrdersQuery,
  useGetOrderByCodeQuery,
} from "@/services/order-services";
import { useAuth } from "@/store/hooks/use-auth";

export const useOrderHistory = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useGetAllOrdersQuery(
    {
      pageIndex: page,
      limit: pageSize,
    },
    {
      skip: !user?.email,
    },
  );

  const orders = ordersData?.items || [];
  const totalItems = ordersData?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return {
    orders,
    isLoading,
    error,
    refetch,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      pageSize,
      goToPage,
      nextPage,
      prevPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const useOrderDetails = (orderCode: string | null) => {
  const {
    data: orderDetails,
    isLoading,
    error,
  } = useGetOrderByCodeQuery(
    { code: orderCode! },
    {
      skip: !orderCode,
    },
  );

  return {
    orderDetails,
    isLoading,
    error,
  };
};
