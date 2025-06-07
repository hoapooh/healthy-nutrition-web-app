"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductNutritionFacts } from "./product-nutrition-facts";
import { ProductReviewsSection } from "./product-reviews-section";
import { Product } from "@/types/product";

interface ProductDetailsTabsProps {
  product: Product;
  className?: string;
}

export const ProductDetailsTabs = ({
  product,
  className = "",
}: ProductDetailsTabsProps) => {
  return (
    <Tabs defaultValue="nutrition" className={`mb-8 ${className}`}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="nutrition" className="font-bold text-green-600">
          Nutrition Facts
        </TabsTrigger>
        <TabsTrigger value="description" className="font-bold text-green-600">
          Description
        </TabsTrigger>
        <TabsTrigger value="reviews" className="font-bold text-green-600">
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="nutrition" className="mt-6">
        <div className="w-full">
          <ProductNutritionFacts nutritionFact={product.nutritionFact} />
        </div>
      </TabsContent>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">
              Product Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* TODO: description need to be fixed here */}
            {/* <p>{product.description}</p> */}

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
            <CardTitle className="text-green-600">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductReviewsSection />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
