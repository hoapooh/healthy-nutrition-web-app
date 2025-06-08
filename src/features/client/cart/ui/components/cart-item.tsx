"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import { formatCurrency } from "@/utils/format-currency";
import { useAppDispatch } from "@/store/hooks";
import { updateCartItem, removeFromCart } from "@/store/slices/cart-slice";
import { motion } from "motion/react";

const MotionCard = motion.create(Card);

interface CartItemComponentProps {
  item: CartItem;
  viewMode?: "full" | "compact";
}

export const CartItemComponent = ({
  item,
  viewMode = "full",
}: CartItemComponentProps) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(
      0,
      Math.min(item.quantity + change, item.maxQuantity),
    );
    if (newQuantity === 0) {
      dispatch(removeFromCart(item.productId));
    } else {
      dispatch(
        updateCartItem({ productId: item.productId, quantity: newQuantity }),
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.productId));
  };

  if (viewMode === "compact") {
    return (
      <MotionCard
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="overflow-hidden"
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={
                  item.imageUrl ||
                  "https://www.shadcnblocks.com/images/block/placeholder-1.svg"
                }
                alt={item.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${item.productId}`}
                className="block transition-colors hover:text-green-600"
              >
                <h3 className="line-clamp-1 text-sm font-medium">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm font-semibold text-green-600">
                {formatCurrency(item.price)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={item.quantity <= 1}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={item.quantity >= item.maxQuantity}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </MotionCard>
    );
  }

  return (
    <MotionCard
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="overflow-hidden py-0"
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Product Image */}
          <div className="relative h-32 w-full flex-shrink-0 sm:h-24 sm:w-24">
            <Image
              src={
                item.imageUrl ||
                "https://www.shadcnblocks.com/images/block/placeholder-1.svg"
              }
              alt={item.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <Link
                  href={`/products/${item.productId}`}
                  className="block transition-colors hover:text-green-600"
                >
                  <h3 className="line-clamp-2 text-lg font-semibold">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(item.price)}
                  </span>
                  {item.quantity > 1 && (
                    <Badge variant="secondary" className="text-xs">
                      {formatCurrency(item.price * item.quantity)} total
                    </Badge>
                  )}
                </div>
              </div>

              {/* Remove Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="mt-2 text-red-600 hover:bg-red-50 hover:text-red-700 sm:mt-0"
              >
                <Trash2 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Remove</span>
              </Button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[3rem] text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={item.quantity >= item.maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stock Information */}
              <div className="text-muted-foreground text-sm">
                {item.stockQuantity > 0 ? (
                  <span>{item.stockQuantity} in stock</span>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    Out of stock
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </MotionCard>
  );
};
