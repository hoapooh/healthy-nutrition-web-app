"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/services/product-services";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format-currency";
import { motion } from "motion/react";

const MotionCard = motion(Card);

interface RelatedProductsProps {
  currentProduct: Product;
  className?: string;
}

export const RelatedProducts = ({
  currentProduct,
  className = "",
}: RelatedProductsProps) => {
  // Fetch products with similar categories, excluding the current product
  const { data, isLoading } = useGetProductsQuery({
    categoryIds: currentProduct.categoryIds,
    limit: 5, // Get 5 to ensure we have 4 after excluding current product
  });

  // Filter out the current product and limit to 4 items
  const relatedProducts = React.useMemo(() => {
    const products = data?.result?.items || [];
    return products
      .filter((product) => product.id !== currentProduct.id)
      .slice(0, 4);
  }, [data?.result?.items, currentProduct.id]);

  if (isLoading) {
    return (
      <div className={`border-t pt-8 ${className}`}>
        <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-0 transition-shadow hover:shadow-md">
              <div className="aspect-square animate-pulse bg-gray-200" />
              <CardContent className="p-4">
                <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <div className={`border-t pt-8 ${className}`}>
        <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No related products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-t pt-8 ${className}`}>
      <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <MotionCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.1 }}
              className="p-0 transition-all hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={
                    product.imageUrls?.[0] ||
                    "https://www.shadcnblocks.com/images/block/placeholder-1.svg"
                  }
                  alt={product.name}
                  fill
                  className="rounded-t-lg object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2 line-clamp-2 font-semibold">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary text-lg font-bold">
                    {formatCurrency(product.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm">{product.rating || "4.5"}</span>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
