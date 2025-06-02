"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { Badge } from "./badge"
import { cn, formatPrice, calculateDiscount } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  variant?: "grid" | "list"
  className?: string
}

export function ProductCard({ product, variant = "grid", className }: ProductCardProps) {
  const { addToCart } = useCart()
  const discount = calculateDiscount(product.originalPrice, product.price)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  if (variant === "list") {
    return (
      <Card className={cn("group hover:shadow-lg transition-shadow duration-300", className)}>
        <CardContent className="p-0">
          <Link href={`/products/${product.id}`} className="flex gap-4 p-4">
            <div className="relative flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={120}
                height={120}
                className="w-30 h-30 object-cover rounded"
              />
              {product.badge && <Badge className="absolute top-2 left-2 bg-green-600">{product.badge}</Badge>}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                {discount > 0 && <Badge variant="destructive">Save {discount}%</Badge>}
              </div>
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("group hover:shadow-lg transition-shadow duration-300", className)}>
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && <Badge className="absolute top-3 left-3 bg-green-600">{product.badge}</Badge>}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="icon" variant="secondary">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            </div>
            <Button className="w-full" size="sm">
              View Details
            </Button>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
