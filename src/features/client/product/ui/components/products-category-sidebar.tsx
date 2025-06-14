import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useGetAllCategoriesQuery } from "@/services/category-services";
import { Category } from "@/types/category";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

interface ProductsCategorySidebarProps {
  selectedCategoryId?: string;
  onCategorySelect: (categoryId: string | null) => void;
}

export const ProductsCategorySidebar = ({
  selectedCategoryId,
  onCategorySelect,
}: ProductsCategorySidebarProps) => {
  // Fetch Product categories
  const { data: productCategoriesResponse, isLoading: isLoadingProducts } =
    useGetAllCategoriesQuery({
      type: "Product",
      limit: 100,
    });

  // Fetch Goal categories
  const { data: goalCategoriesResponse, isLoading: isLoadingGoals } =
    useGetAllCategoriesQuery({
      type: "Goal",
      limit: 100,
    });

  const productCategories = productCategoriesResponse?.result?.items || [];
  const goalCategories = goalCategoriesResponse?.result?.items || [];
  const allCategories = [...productCategories, ...goalCategories];
  const isLoading = isLoadingProducts || isLoadingGoals;

  if (isLoading) {
    return (
      <Card className="h-fit py-4">
        <CardHeader className="px-4">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const handleCategoryClick = (categoryId: string) => {
    // If the clicked category is already selected, deselect it (show all products)
    if (selectedCategoryId === categoryId) {
      onCategorySelect(null);
    } else {
      onCategorySelect(categoryId);
    }
  };

  return (
    <Card className="h-fit gap-4 py-4 lg:sticky lg:top-4">
      <CardHeader className="px-4">
        <CardTitle className="flex flex-wrap items-center justify-between gap-1">
          Danh mục
          {selectedCategoryId && (
            <Badge variant="secondary" className="truncate text-xs">
              {allCategories.find((c) => c.id === selectedCategoryId)?.name ||
                "Đã chọn"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        {/* All Products option */}
        <MotionButton
          whileHover={{ x: 10 }}
          transition={{ duration: 0.1 }}
          variant={!selectedCategoryId ? "default" : "ghost"}
          className={cn(
            "w-full justify-start text-left",
            !selectedCategoryId && "bg-green-600 hover:bg-green-700",
          )}
          onClick={() => onCategorySelect(null)}
        >
          Tất cả sản phẩm
        </MotionButton>
        {/* Category options - responsive layout */}
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:space-y-1">
          {/* Product Categories Section */}
          {productCategories.length > 0 && (
            <>
              <div className="text-muted-foreground mb-2 w-full text-xs font-medium lg:mb-1">
                Danh mục sản phẩm
              </div>
              {productCategories.map((category: Category) => (
                <MotionButton
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.1 }}
                  key={category.id}
                  variant={
                    selectedCategoryId === category.id ? "default" : "ghost"
                  }
                  className={cn(
                    "justify-start text-left lg:w-full",
                    selectedCategoryId === category.id &&
                      "bg-green-600 hover:bg-green-700",
                  )}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">{category.name}</span>
                  </div>
                </MotionButton>
              ))}
            </>
          )}

          {/* Separator between categories if both exist */}
          {productCategories.length > 0 && goalCategories.length > 0 && (
            <Separator className="my-2 w-full lg:my-3" />
          )}

          {/* Goal Categories Section */}
          {goalCategories.length > 0 && (
            <>
              <div className="text-muted-foreground mb-2 w-full text-xs font-medium lg:mb-1">
                Danh mục mục tiêu
              </div>
              {goalCategories.map((category: Category) => (
                <MotionButton
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.1 }}
                  key={category.id}
                  variant={
                    selectedCategoryId === category.id ? "default" : "ghost"
                  }
                  className={cn(
                    "justify-start text-left lg:w-full",
                    selectedCategoryId === category.id &&
                      "bg-green-600 hover:bg-green-700",
                  )}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">{category.name}</span>
                  </div>
                </MotionButton>
              ))}
            </>
          )}
        </div>
        {productCategories.length === 0 && goalCategories.length === 0 && (
          <div className="text-muted-foreground py-4 text-center text-sm">
            Không tìm thấy danh mục
          </div>
        )}
      </CardContent>
    </Card>
  );
};
