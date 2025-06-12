"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Star,
  // Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format-currency";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  selectCartItemByProductId,
} from "@/store/slices/cart-slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  formatWeight,
  calculatePriceByWeight,
  getDefaultWeight,
} from "@/utils/weight-utils";

interface ProductInfoProps {
  product: Product;
  className?: string;
}

export const ProductInfo = ({ product, className = "" }: ProductInfoProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Initialize with default weight (1kg if available, otherwise the largest weight)
  const availableWeights = product.weights || [1000]; // fallback to 1kg if no weights
  const [selectedWeight, setSelectedWeight] = useState(() =>
    getDefaultWeight(availableWeights),
  );
  const [quantity, setQuantity] = useState(1);

  // Calculate price based on selected weight
  const currentPrice = calculatePriceByWeight(product.price, selectedWeight);

  // Check if this specific product+weight combination is in cart
  const cartItem = useAppSelector(selectCartItemByProductId(product.id));
  const specificCartItem =
    cartItem && cartItem.weight === selectedWeight ? cartItem : null;
  // const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };
  const handleAddToCart = () => {
    if (product.stockQuantity === 0) {
      toast.error("Sản phẩm hết hàng");
      return;
    }

    const imageUrl = product.imageUrls?.[0] || "";

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: currentPrice,
        quantity,
        imageUrl,
        stockQuantity: product.stockQuantity,
        weight: selectedWeight,
        pricePerKg: product.price,
      }),
    );

    toast.success(
      `${quantity} x ${product.name} (${formatWeight(selectedWeight)}) đã thêm vào giỏ hàng!`,
    );
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  const isInCart = !!specificCartItem;
  const handleShare = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    toast.success("Liên kết sản phẩm đã được sao chép vào clipboard!", {
      duration: 3000,
      position: "top-center",
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
            ))}{" "}
            <span className="text-muted-foreground ml-1 text-sm">
              (4.7) 127 đánh giá
            </span>
          </div>
          <Badge variant="secondary">
            Còn hàng: {product.stockQuantity}
          </Badge>{" "}
        </div>
        {/* TODO: description need to be fixed here */}
        {/* <p className="text-muted-foreground mb-4">{product.description}</p> */}
        <div className="text-primary mb-6 text-3xl font-bold">
          {formatCurrency(currentPrice)}
          <span className="text-muted-foreground ml-2 text-sm">
            cho {formatWeight(selectedWeight)}
          </span>
        </div>
      </div>{" "}
      {/* Weight Selection */}
      <div className="space-y-2">
        <span className="font-medium">Trọng lượng:</span>
        <div className="flex flex-wrap gap-2">
          {availableWeights.map((weight) => (
            <Button
              key={weight}
              variant={selectedWeight === weight ? "healthy" : "outline"}
              size="sm"
              onClick={() => setSelectedWeight(weight)}
            >
              {formatWeight(weight)}
            </Button>
          ))}
        </div>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>{" "}
      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-medium">Số lượng:</span>
          <div className="flex items-center rounded-lg border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-12 px-4 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stockQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>{" "}
        <div className="flex gap-3">
          <Button
            className={cn("flex-1", isInCart ? "text-green-600" : "")}
            size="lg"
            variant={isInCart ? "outline" : "healthy"}
            onClick={isInCart ? handleViewCart : handleAddToCart}
            disabled={product.stockQuantity === 0}
          >
            {" "}
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInCart ? "Xem giỏ hàng" : "Thêm vào giỏ hàng"}
          </Button>

          {/* // TODO: this feature will be update later */}
          {/* <Button
            variant="outline"
            size="lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`}
            />
          </Button> */}

          <Button variant="outline" size="lg" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>{" "}
      {/* Features */}
      <div className="grid grid-cols-3 gap-4 border-t pt-6">
        <div className="text-center">
          <Truck className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <div className="text-sm font-medium">Miễn phí vận chuyển</div>
          <div className="text-muted-foreground text-xs">
            Đơn hàng trên {formatCurrency(1000)}
          </div>
        </div>
        <div className="text-center">
          <RotateCcw className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <div className="text-sm font-medium">Đổi trả trong 30 ngày</div>
          <div className="text-muted-foreground text-xs">Bảo đảm hoàn tiền</div>
        </div>
        <div className="text-center">
          <Shield className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <div className="text-sm font-medium">Thanh toán an toàn</div>
          <div className="text-muted-foreground text-xs">Mã hóa SSL</div>
        </div>
      </div>
    </div>
  );
};
