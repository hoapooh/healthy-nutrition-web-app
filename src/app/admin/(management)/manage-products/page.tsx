import { Metadata } from "next";
import React from "react";
import ProductsPageContent from "@/features/admin/products/ui/products-page-content";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm",
  description: "Quản lý sản phẩm một cách hiệu quả.",
};

const ProductPage = () => {
  return <ProductsPageContent />;
};

export default ProductPage;
