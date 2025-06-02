import { Metadata } from "next";
import React from "react";
import ProductsPageContent from "@/features/admin/products/ui/products-page-content";

export const metadata: Metadata = {
  title: "Product Management",
  description: "Manage products effectively.",
};

const ProductPage = () => {
  return <ProductsPageContent />;
};

export default ProductPage;
