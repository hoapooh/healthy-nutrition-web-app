"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorMessage from "@/components/ui/error-message";
import { useCart } from "@/hooks/use-cart";
import { ProductServices } from "@/services/product-services";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductServices.getProductById(productId);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          title="Product not found"
          message={error || "The product you're looking for doesn't exist."}
        />
      </div>
    );
  }

  const discount = calculateDiscount(product.originalPrice, product.price);
  const images = [product.image, product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="h-96 w-full rounded-lg object-cover lg:h-[500px]"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-green-600">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              {product.name}
            </h1>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-current text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {discount > 0 && (
                <Badge variant="destructive">Save {discount}%</Badge>
              )}
            </div>
          </div>

          {product.description && (
            <p className="text-lg leading-relaxed text-gray-600">
              {product.description}
            </p>
          )}

          {/* Certifications */}
          <div className="flex flex-wrap gap-2">
            {product.isOrganic && (
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Organic
              </Badge>
            )}
            {product.isVegan && (
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Vegan
              </Badge>
            )}
            {product.isGlutenFree && (
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Gluten-Free
              </Badge>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center rounded-lg border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="border-x px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Truck className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders over £50</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Shield className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium">Quality Guarantee</div>
                <div className="text-sm text-gray-600">Third-party tested</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <RotateCcw className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium">30-Day Returns</div>
                <div className="text-sm text-gray-600">
                  Money back guarantee
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Award className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium">Premium Quality</div>
                <div className="text-sm text-gray-600">GMP certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Product Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">Description</h4>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Health Benefits</h3>
                {product.benefits ? (
                  <ul className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">
                    Benefits information will be available soon.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Ingredients</h3>
                <p className="mb-4 text-gray-600">
                  {product.ingredients ||
                    "Ingredients information will be available soon."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-semibold">Customer Reviews</h3>
                <div className="py-8 text-center text-gray-500">
                  <p>Reviews will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
