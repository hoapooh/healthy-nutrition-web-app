"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface EmptyOrderHistoryProps {
  className?: string;
}

export const EmptyOrderHistory = ({
  className = "",
}: EmptyOrderHistoryProps) => {
  return (
    <Card className={`${className}`}>
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6">
          <Receipt className="h-12 w-12 text-gray-400" />
        </div>{" "}
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Chưa có đơn hàng
        </h2>
        <p className="mb-8 max-w-md text-gray-600">
          Bạn chưa đặt bất kỳ đơn hàng nào. Bắt đầu mua sắm để xây dựng hành
          trình dinh dưỡng lành mạnh của bạn!
        </p>
        <div className="flex flex-col gap-y-3">
          <Link href="/products">
            <Button size="lg" variant="healthy" className="min-w-[200px]">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Bắt đầu mua sắm
            </Button>
          </Link>

          <div className="text-sm text-gray-500">
            Khám phá bộ sưu tập sản phẩm dinh dưỡng lành mạnh của chúng tôi
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
