"use client"

import { useState, useCallback } from "react"
import { useLocalStorage } from "./use-local-storage"
import type { Product } from "@/types/product"

export interface CartItem {
  product: Product
  quantity: number
}

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", [])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.product.id === product.id)

        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        }

        return [...prev, { product, quantity }]
      })
    },
    [setCartItems],
  )

  const removeFromCart = useCallback(
    (productId: number) => {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
    },
    [setCartItems],
  )

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    },
    [setCartItems, removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  }
}
