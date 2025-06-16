import { Metadata } from "next";
import ProductDetailClient from "./product-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // In a real application, you would fetch the product data here
  // For now, we'll create a basic metadata structure
  const productId = (await params).id;

  // You can fetch product data here for dynamic metadata
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`,
  ).then((res) => res.json());

  return {
    title: `${product.product.name}`,
    description: `Discover the nutritional benefits and details of our healthy products. Shop premium quality organic and natural products for your wellness journey.`,
    keywords: [
      "product details",
      "healthy food",
      "organic products",
      "nutrition information",
      "wellness products",
      "healthy lifestyle",
    ],
    openGraph: {
      title: `Product Details - Healthy Nutrition`,
      description: `Discover the nutritional benefits and details of our healthy products. Shop premium quality organic and natural products for your wellness journey.`,
      type: "website",
      url: `/products/${productId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Product Details - Healthy Nutrition`,
      description: `Discover the nutritional benefits and details of our healthy products.`,
    },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
