import { Metadata } from "next";
import ProductsClient from "./products-client";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our wide selection of healthy and nutritious products. Find organic foods, supplements, and wellness products to support your healthy lifestyle.",
  keywords: [
    "healthy products",
    "organic food",
    "nutrition supplements",
    "wellness products",
    "healthy lifestyle",
    "natural products",
  ],
  openGraph: {
    title: "Products - Healthy Nutrition",
    description:
      "Browse our wide selection of healthy and nutritious products. Find organic foods, supplements, and wellness products to support your healthy lifestyle.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
