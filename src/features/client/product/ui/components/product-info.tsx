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
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: Product;
  className?: string;
}

export const ProductInfo = ({ product, className = "" }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  // const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} of ${product.name} to cart`);
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    toast.success("Product link copied to clipboard!", {
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
            ))}
            <span className="text-muted-foreground ml-1 text-sm">
              (4.7) 127 reviews
            </span>
          </div>
          <Badge variant="secondary">In Stock: {product.stockQuantity}</Badge>
        </div>
        {/* TODO: description need to be fixed here */}
        {/* <p className="text-muted-foreground mb-4">{product.description}</p> */}
        <div className="text-primary mb-6 text-3xl font-bold">
          {formatCurrency(product.price)}
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
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            size="lg"
            variant={"healthy"}
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
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
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 border-t pt-6">
        <div className="text-center">
          <Truck className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <div className="text-sm font-medium">Free Shipping</div>
          <div className="text-muted-foreground text-xs">Orders over $50</div>
        </div>
        <div className="text-center">
          <RotateCcw className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <div className="text-sm font-medium">30-Day Returns</div>
          <div className="text-muted-foreground text-xs">
            Money back guarantee
          </div>
        </div>
        <div className="text-center">
          <Shield className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <div className="text-sm font-medium">Secure Payment</div>
          <div className="text-muted-foreground text-xs">SSL encrypted</div>
        </div>
      </div>
    </div>
  );
};
