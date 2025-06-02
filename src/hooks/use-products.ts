"use client"

import { useState, useEffect, useMemo } from "react"
import type { Product, ProductFilter } from "@/types/product"
import { ProductServices } from "@/services/product-services"

export function useProducts(initialFilter?: Partial<ProductFilter>) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<ProductFilter>({
    category: "All",
    priceRanges: [],
    sortBy: "latest",
    ...initialFilter,
  })

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Apply category filter
    if (filter.category !== "All") {
      result = result.filter((product) => product.category === filter.category)
    }

    // Apply price range filter
    if (filter.priceRanges.length > 0) {
      result = result.filter((product) =>
        filter.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          return product.price >= min && product.price <= (max || 999)
        }),
      )
    }

    // Apply sorting
    switch (filter.sortBy) {
      case "latest":
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case "alphabet-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "alphabet-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [products, filter])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await ProductServices.getAllProducts()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const updateFilter = (newFilter: Partial<ProductFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }))
  }

  const resetFilter = () => {
    setFilter({
      category: "All",
      priceRanges: [],
      sortBy: "latest",
    })
  }

  return {
    products: filteredProducts,
    loading,
    error,
    filter,
    updateFilter,
    resetFilter,
    totalCount: products.length,
    filteredCount: filteredProducts.length,
  }
}
