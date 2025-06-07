import React from "react";
import { Filter, LoaderCircle } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { motion, AnimatePresence } from "motion/react";

interface ProductsGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  isLoading: boolean;
  error: unknown;
}

export const ProductsGrid = ({
  products,
  viewMode,
  isLoading,
  error,
}: ProductsGridProps) => {
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <LoaderCircle className="inline-block size-8 animate-spin text-green-600" />
        <p className="text-muted-foreground mt-2">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500">
          Error loading products. Please try again.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <Filter className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-semibold">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    // TODO: consider if 3 or 4 columns is better for grid view
    <motion.div
      className={
        viewMode === "grid"
          ? "mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          : "mb-8 space-y-4"
      }
      layout
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
