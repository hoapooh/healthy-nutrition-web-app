import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format-currency";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  selectCartItemByProductId,
} from "@/store/slices/cart-slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  formatWeight,
  calculatePriceByWeight,
  getDefaultWeight,
} from "@/utils/weight-utils";

const MotionCard = motion.create(Card);

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItem = useAppSelector(selectCartItemByProductId(product.id));

  // Use default weight (1kg if available, otherwise the largest weight)
  const availableWeights = product.weights || [1000];
  const defaultWeight = getDefaultWeight(availableWeights);
  const defaultPrice = calculatePriceByWeight(product.price, defaultWeight);

  const cardClass =
    viewMode === "grid"
      ? "rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-0"
      : "rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-row items-center gap-4 p-4";

  const imageClass =
    viewMode === "grid"
      ? "w-full h-48 object-cover rounded-t-lg"
      : "min-w-32 min-h-32 object-cover rounded-lg shrink-0";

  const contentClass = viewMode === "grid" ? "p-4" : "flex-1";
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stockQuantity === 0) {
      toast.error("Sản phẩm hết hàng");
      return;
    }

    const imageUrl = product.imageUrls?.[0] || "";
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: defaultPrice,
        quantity: 1,
        imageUrl,
        stockQuantity: product.stockQuantity,
        weight: defaultWeight,
        pricePerKg: product.price,
        availableWeights: availableWeights,
      }),
    );
    toast.success(
      `${product.name} (${formatWeight(defaultWeight)}) đã thêm vào giỏ hàng!`,
    );
  };

  const handleViewCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/cart");
  };

  const isInCart = !!cartItem;

  return (
    <MotionCard
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cardClass}
    >
      <div className={viewMode === "list" ? "contents" : ""}>
        <div
          className={cn(
            "relative",
            viewMode === "list" ? "min-h-32 min-w-32 flex-shrink-0" : "",
          )}
        >
          <Image
            src={
              product!.imageUrls![0] ||
              "https://www.shadcnblocks.com/images/block/placeholder-1.svg"
            }
            alt={product.name}
            width={viewMode === "grid" ? 400 : 160}
            height={viewMode === "grid" ? 192 : 160}
            className={imageClass}
          />

          <div className="bg-opacity-80 absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-green-600/80 px-2 py-1 backdrop-blur-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm text-white">
                ({product.rating?.toFixed(1) || "0.0"})
              </span>
            </div>
          </div>
        </div>

        <div className={contentClass}>
          <CardHeader className={viewMode === "list" ? "p-0 pb-2" : "p-0"}>
            <div className="flex items-start justify-between">
              <Link
                href={`/products/${product.id}`}
                className="transition-colors duration-200 hover:text-green-600"
              >
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {product.name}
                </h3>
              </Link>
            </div>
          </CardHeader>
          <CardContent className={viewMode === "list" ? "p-0 py-2" : "p-0"}>
            <div className="mb-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-muted-foreground text-sm">
              <div className="flex flex-wrap gap-2 text-xs">
                <span>Calo: {product.nutritionFact.calories}</span>
                <span>Protein: {product.nutritionFact.protein}g</span>
                <span>Carbs: {product.nutritionFact.carbs}g</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className={viewMode === "list" ? "p-0 pt-2" : "mt-3 p-0"}>
            {viewMode === "grid" ? (
              <div className="flex w-full flex-col gap-y-2">
                <div className="flex flex-col">
                  <span className="text-primary text-2xl font-bold">
                    {formatCurrency(defaultPrice)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    cho {formatWeight(defaultWeight)}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant={isInCart ? "outline" : "healthy"}
                  onClick={isInCart ? handleViewCart : handleAddToCart}
                  className={cn("", isInCart ? "text-green-600" : "")}
                  disabled={product.stockQuantity === 0}
                >
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  {isInCart ? "Xem giỏ hàng" : "Thêm vào giỏ hàng"}
                </Button>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-primary text-2xl font-bold">
                    {formatCurrency(defaultPrice)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    cho {formatWeight(defaultWeight)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={isInCart ? "outline" : "healthy"}
                    onClick={isInCart ? handleViewCart : handleAddToCart}
                    className={cn("", isInCart ? "text-green-600" : "")}
                    disabled={product.stockQuantity === 0}
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    {isInCart ? "Xem giỏ hàng" : "Thêm vào giỏ hàng"}
                  </Button>
                </div>
              </div>
            )}
          </CardFooter>
        </div>
      </div>
    </MotionCard>
  );
};
