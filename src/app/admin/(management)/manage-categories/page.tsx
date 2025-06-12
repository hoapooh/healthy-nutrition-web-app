import React from "react";
import CategoriesPageContent from "@/features/admin/categories/ui/categories-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý danh mục",
  description: "Quản lý danh mục của bạn một cách hiệu quả và hiệu quả.",
};

const CategoriesPage = () => {
  return <CategoriesPageContent />;
};

export default CategoriesPage;
