"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems, initializeCart } from "@/store/slices/cart-slice";
import { CartHeader } from "./cart-header";
import { CartItemComponent } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { EmptyCart } from "./empty-cart";
import { AnimatePresence } from "motion/react";

interface CartPageContentProps {
  className?: string;
}

export const CartPageContent = ({ className = "" }: CartPageContentProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const hasItems = cartItems.length > 0;

  if (!hasItems) {
    return (
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        <CartHeader className="mb-8" />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <CartHeader className="mb-8" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItemComponent key={item.id} item={item} viewMode="full" />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};
