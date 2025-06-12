"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cart-slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, History, Home } from "lucide-react";
import { toast } from "sonner";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Clear the cart when user arrives on this page after successful payment
    dispatch(clearCart());
    toast.success("Thanh toán thành công! Đơn hàng của bạn đã được xác nhận.");
  }, [dispatch]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewOrderHistory = () => {
    router.push("/order-history");
  };

  return (
    <ProtectedRoute allowedRoles={["User"]} requireAuth redirectTo="/">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center">
          <Card>
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>{" "}
              <CardTitle className="text-2xl text-green-700">
                Thanh toán thành công!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-2 text-lg">
                  Cảm ơn bạn đã đặt hàng!
                </p>
                <p className="text-muted-foreground text-sm">
                  Thanh toán của bạn đã được xử lý thành công và đơn hàng đang
                  được chuẩn bị. Bạn sẽ nhận được email xác nhận sớm.
                </p>
              </div>{" "}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  onClick={handleGoHome}
                  className="gap-2"
                  variant={"healthy"}
                >
                  <Home className="h-4 w-4" />
                  Về trang chủ
                </Button>
                <Button
                  onClick={handleViewOrderHistory}
                  variant="outline"
                  className="gap-2"
                >
                  <History className="h-4 w-4" />
                  Xem lịch sử đơn hàng
                </Button>
              </div>
              <div className="border-t pt-4">
                <p className="text-muted-foreground text-xs">
                  Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, vui lòng liên hệ
                  đội hỗ trợ của chúng tôi.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PaymentSuccessPage;
