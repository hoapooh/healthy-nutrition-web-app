import React from "react";
import { CartPageContent } from "@/features/client/cart/ui/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Xem và quản lý sản phẩm trong giỏ hàng của bạn",
};

const CartPage = () => {
  return <CartPageContent />;
};

export default CartPage;
