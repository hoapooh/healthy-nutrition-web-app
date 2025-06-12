"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, ShoppingCart } from "lucide-react";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";

const PaymentCancelledPage = () => {
  const router = useRouter();

  return (
    <ProtectedRoute allowedRoles={["User"]} requireAuth redirectTo="/">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>{" "}
            <CardTitle className="text-2xl font-bold">
              Thanh toán đã bị hủy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              {" "}
              <p className="text-muted-foreground">
                Quá trình thanh toán của bạn đã bị hủy. Đừng lo, không có khoản
                phí nào được tính vào tài khoản của bạn.
              </p>
              <p className="text-muted-foreground text-sm">
                Bạn có thể tiếp tục mua sắm hoặc quay lại giỏ hàng để thử lại.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => router.push("/")}
                variant="healthy"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Về trang chủ
              </Button>
              <Button
                onClick={() => router.push("/cart")}
                variant="outline"
                className="gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Quay lại giỏ hàng
              </Button>
            </div>

            <div className="text-muted-foreground text-xs">
              <p>
                Cần trợ giúp? Liên hệ đội hỗ trợ của chúng tôi để được hỗ trợ.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default PaymentCancelledPage;
