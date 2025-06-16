"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotalItems, clearCart } from "@/store/slices/cart-slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CartHeaderProps {
  className?: string;
}

export const CartHeader = ({ className = "" }: CartHeaderProps) => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartTotalItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex items-center gap-4">
        <Link href="/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tiếp tục mua sắm
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl">Giỏ hàng</h1>
          {totalItems > 0 && (
            <Badge variant="secondary" className="text-sm">
              {totalItems} {totalItems === 1 ? "sản phẩm" : "sản phẩm"}
            </Badge>
          )}
        </div>
      </div>

      {totalItems > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa giỏ hàng
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa giỏ hàng</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng? Hành
                động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClearCart}
                className="bg-red-600 hover:bg-red-700"
              >
                Xóa giỏ hàng
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
