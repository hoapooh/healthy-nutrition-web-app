import React from "react";
import CategoriesPageContent from "@/features/admin/categories/ui/categories-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories Management",
  description: "Manage your categories effectively and efficiently.",
};

const CategoriesPage = () => {
  return <CategoriesPageContent />;
};

export default CategoriesPage;
