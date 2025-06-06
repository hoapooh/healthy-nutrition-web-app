"use client";

import React, { useState } from "react";
import { useGetProductByIdQuery } from "@/services/product-services";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

// Review Component
const ReviewSection = () => {
  const reviews = [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent product! Great quality and taste. Highly recommended for anyone looking to maintain a healthy diet.",
      helpful: 12,
    },
    {
      id: "2",
      author: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Good nutritional value and packaging. Delivery was quick too.",
      helpful: 8,
    },
    {
      id: "3",
      author: "Emily Davis",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Amazing results after using this for a month. Feel much more energetic!",
      helpful: 15,
    },
  ];

  const averageRating = 4.7;
  const totalReviews = 127;
  const ratingDistribution = [
    { stars: 5, count: 85, percentage: 67 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold">{averageRating}</div>
          <div className="mb-2 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-current text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-muted-foreground text-sm">
            Based on {totalReviews} reviews
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <div className="flex w-16 items-center gap-1">
                <span className="text-sm">{rating.stars}</span>
                <Star className="h-3 w-3 fill-current text-yellow-400" />
              </div>
              <Progress value={rating.percentage} className="flex-1" />
              <span className="text-muted-foreground w-8 text-sm">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{review.author}</h4>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-3">{review.comment}</p>
            <div className="flex items-center gap-4 text-sm">
              <button className="text-muted-foreground hover:text-primary">
                Helpful ({review.helpful})
              </button>
              <button className="text-muted-foreground hover:text-primary">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Nutrition Facts Component
const NutritionFacts = ({
  nutritionFact,
}: {
  nutritionFact: {
    calories: number;
    protein: number;
    cholesterol: number;
    lipid: number;
    sugar: number;
    carbs: number;
  };
}) => {
  const facts = [
    { label: "Calories", value: nutritionFact.calories, unit: "" },
    { label: "Protein", value: nutritionFact.protein, unit: "g" },
    { label: "Carbohydrates", value: nutritionFact.carbs, unit: "g" },
    { label: "Total Fat (Lipid)", value: nutritionFact.lipid, unit: "g" },
    { label: "Sugar", value: nutritionFact.sugar, unit: "g" },
    { label: "Cholesterol", value: nutritionFact.cholesterol, unit: "mg" },
  ];

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6">
      <h3 className="mb-4 border-b-2 border-black pb-2 text-lg font-bold">
        Nutrition Facts
      </h3>
      <div className="space-y-3">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 pb-2"
          >
            <span className="font-medium">{fact.label}</span>
            <span className="font-bold">
              {fact.value}
              {fact.unit}
            </span>
          </div>
        ))}
      </div>
      <div className="text-muted-foreground mt-4 text-xs">
        * Percent Daily Values are based on a 2,000 calorie diet.
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data, isLoading, error } = useGetProductByIdQuery({ id: productId });
  const product = data?.product;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && product && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} of ${product?.name} to cart`);
  };

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
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="text-muted-foreground flex items-center space-x-2 text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </div>
      </nav>

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src="https://www.shadcnblocks.com/images/block/placeholder-1.svg"
              alt={product.name}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="hover:border-primary aspect-square cursor-pointer overflow-hidden rounded-lg border"
              >
                <Image
                  src="https://www.shadcnblocks.com/images/block/placeholder-1.svg"
                  alt={`${product.name} ${i + 1}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current text-yellow-400"
                  />
                ))}
                <span className="text-muted-foreground ml-1 text-sm">
                  (4.7) 127 reviews
                </span>
              </div>
              <Badge variant="secondary">
                In Stock: {product.stockQuantity}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="text-primary mb-6 text-3xl font-bold">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-12 px-4 py-2 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`}
                />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 border-t pt-6">
            <div className="text-center">
              <Truck className="text-primary mx-auto mb-2 h-6 w-6" />
              <div className="text-sm font-medium">Free Shipping</div>
              <div className="text-muted-foreground text-xs">
                Orders over $50
              </div>
            </div>
            <div className="text-center">
              <RotateCcw className="text-primary mx-auto mb-2 h-6 w-6" />
              <div className="text-sm font-medium">30-Day Returns</div>
              <div className="text-muted-foreground text-xs">
                Money back guarantee
              </div>
            </div>
            <div className="text-center">
              <Shield className="text-primary mx-auto mb-2 h-6 w-6" />
              <div className="text-sm font-medium">Secure Payment</div>
              <div className="text-muted-foreground text-xs">SSL encrypted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="nutrition" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="mt-6">
          <div className="max-w-md">
            <NutritionFacts nutritionFact={product.nutritionFact} />
          </div>
        </TabsContent>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{product.description}</p>
              <div>
                <h4 className="mb-2 font-semibold">Key Features:</h4>
                <ul className="text-muted-foreground list-inside list-disc space-y-1">
                  <li>High quality, natural ingredients</li>
                  <li>Rich in essential nutrients</li>
                  <li>No artificial preservatives</li>
                  <li>Suitable for daily consumption</li>
                  <li>Environmentally friendly packaging</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Ingredients:</h4>
                <p className="text-muted-foreground">
                  Natural ingredients carefully selected to provide optimal
                  nutrition and taste.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewSection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="border-t pt-8">
        <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Placeholder for related products */}
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="transition-shadow hover:shadow-md">
              <div className="aspect-square">
                <Image
                  src="https://www.shadcnblocks.com/images/block/placeholder-1.svg"
                  alt="Related product"
                  width={300}
                  height={300}
                  className="h-full w-full rounded-t-lg object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Related Product {i + 1}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary text-lg font-bold">$29.99</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm">4.5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
