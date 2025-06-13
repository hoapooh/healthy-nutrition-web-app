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
          Thông tin dinh dưỡng
        </TabsTrigger>
        <TabsTrigger value="description" className="font-bold text-green-600">
          Mô tả
        </TabsTrigger>
        <TabsTrigger value="reviews" className="font-bold text-green-600">
          Đánh giá
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
            <CardTitle className="text-green-600">Mô tả sản phẩm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* TODO: description need to be fixed here */}
            {/* <p>{product.description}</p> */}
            <div>
              <h4 className="mb-2 font-semibold">Tính năng chính:</h4>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Thành phần tự nhiên chất lượng cao</li>
                <li>Giàu chất dinh dưỡng thiết yếu</li>
                <li>Không chất bảo quản nhân tạo</li>
                <li>Phù hợp cho việc tiêu thụ hàng ngày</li>
                <li>Bao bì thân thiện với môi trường</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Thành phần:</h4>
              <p className="text-muted-foreground">
                Các thành phần tự nhiên được lựa chọn cẩn thận để cung cấp dinh
                dưỡng và hương vị tối ưu.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">
              Đánh giá khách hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductReviewsSection productId={product.id} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
