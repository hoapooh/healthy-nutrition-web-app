"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/slices/cart-slice";
import { useCreatePaymentLinkMutation } from "@/services/payment-services";
import { OrderItemPayment } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format-currency";
import { formatWeight } from "@/utils/weight-utils";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";

const CheckoutPage = () => {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const [createPaymentLink, { isLoading }] = useCreatePaymentLinkMutation();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shippingCost;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems.length, router]);

  console.log(cartItems);

  const handlePayment = async () => {
    try {
      // Convert cart items to OrderItemPayment format
      const items: OrderItemPayment[] = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        weight: item.quantity * (item.weight / 1000),
        pricePerKilogram: item.pricePerKg,
      }));
      const paymentData = {
        orderInformation: {
          items,
        },
        returnUrl: `${window.location.origin}/payment-success`, // Return to success page to clear cart
        cancelUrl: `${window.location.origin}/payment-cancelled`, // Cancel page
      };

      const paymentDataResponse = await createPaymentLink(paymentData).unwrap();
      toast.success("Đang chuyển hướng đến thanh toán...");

      setTimeout(() => {
        window.location.href = paymentDataResponse.checkoutUrl;
      }, 1000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <ProtectedRoute requireAuth allowedRoles={["User"]} redirectTo="/">
      <div className="container mx-auto max-w-7xl min-w-4xl px-4 py-8">
        <div className="mb-6">
          {" "}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại giỏ hàng
          </Button>
          <h1 className="text-3xl font-bold">Thanh toán</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {" "}
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>{" "}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-sm">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>{" "}
                        <p className="text-muted-foreground text-sm">
                          Trọng lượng: {formatWeight(item.weight)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            {" "}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Tóm tắt thanh toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vận chuyển</span>
                    <span
                      className={
                        shippingCost === 0 ? "font-medium text-green-600" : ""
                      }
                    >
                      {" "}
                      {shippingCost === 0
                        ? "MIỄN PHÍ"
                        : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  {subtotal < 50 && subtotal > 0 && (
                    <div className="text-muted-foreground rounded bg-blue-50 p-2 text-xs">
                      Thêm {formatCurrency(50 - subtotal)} để được miễn phí vận
                      chuyển!
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-green-600">
                    {formatCurrency(total)}
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full"
                  size="lg"
                  variant="healthy"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Thanh toán ngay
                    </>
                  )}
                </Button>

                <p className="text-muted-foreground text-center text-xs">
                  Thanh toán của bạn được bảo mật bằng mã hóa SSL
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;
