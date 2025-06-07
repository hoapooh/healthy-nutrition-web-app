"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface EmptyCartProps {
  className?: string;
}

export const EmptyCart = ({ className = "" }: EmptyCartProps) => {
  return (
    <Card className={`${className}`}>
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>

        <p className="mb-8 max-w-md text-gray-600">
          Looks like you haven&apos;t added any healthy products to your cart
          yet. Start shopping to fill it up!
        </p>

        <div className="flex flex-col gap-y-3">
          <Link href="/products">
            <Button size="lg" variant="healthy" className="min-w-[200px]">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>

          <div className="text-sm text-gray-500">
            Discover our collection of healthy nutrition products
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
