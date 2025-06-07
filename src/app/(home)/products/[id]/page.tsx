"use client";

import React from "react";
import { useGetProductByIdQuery } from "@/services/product-services";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ProductImageCarousel,
  ProductInfo,
  ProductDetailsTabs,
  RelatedProducts,
  ProductBreadcrumb,
} from "@/features/client/product/ui/components";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;

  const { data, isLoading, error } = useGetProductByIdQuery({ id: productId });
  const product = data?.product;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-12 text-center">
          <div className="border-primary inline-block h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-2">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-12 text-center">
          <p className="mb-4 text-red-500">
            Product not found or error loading product.
          </p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb and Back Button */}
      <ProductBreadcrumb productName={product.name} />

      {/* Main Product Content */}
      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <ProductImageCarousel
          images={product.imageUrls || []}
          productName={product.name}
        />

        {/* Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Product Details Tabs */}
      <ProductDetailsTabs product={product} />

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </div>
  );
};

export default ProductDetailPage;
