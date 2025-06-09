"use client";

import {
  useGetOrderByUserQuery,
  useGetOrderByCodeQuery,
} from "@/services/order-services";
import { useAuth } from "@/store/hooks/use-auth";

export const useOrderHistory = () => {
  const { user } = useAuth();

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useGetOrderByUserQuery(undefined, {
    skip: !user?.email,
  });

  const orders = ordersData?.items || [];
  const totalItems = ordersData?.totalCount || 0;

  return {
    orders,
    isLoading,
    error,
    refetch,
    pagination: {
      totalItems,
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
