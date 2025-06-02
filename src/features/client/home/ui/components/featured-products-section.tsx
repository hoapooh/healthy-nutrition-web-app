"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/features/shared/ui/components/product-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ProductServices } from "@/services/product-services";
import type { Product } from "@/types/product";

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await ProductServices.getFeaturedProducts(4);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Today's Trending
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            What's hot today
          </p>
        </div>

        <div className="mb-8 flex justify-center space-x-4">
          <button className="text-gray-700 hover:text-green-600 focus:outline-none">
            All Products
          </button>
          <button className="text-gray-700 hover:text-green-600 focus:outline-none">
            Vegan Products
          </button>
          <button className="text-gray-700 hover:text-green-600 focus:outline-none">
            Halal Products
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
