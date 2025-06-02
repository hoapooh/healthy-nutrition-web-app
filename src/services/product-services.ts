import type { Product, ProductFilter } from "@/types/product"

// Enhanced mock data with more realistic products
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Vitamin D3 - 5000 IU",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vitamins",
    badge: "Best Seller",
    isVegan: true,
    isOrganic: true,
    isGlutenFree: true,
    dateAdded: "2024-05-15",
    description: "High-quality organic vitamin D3 supplement for immune support and bone health.",
    ingredients: "Organic Vitamin D3 (as Cholecalciferol), Organic Coconut Oil, Organic Beeswax",
    benefits: ["Supports immune system function", "Promotes bone and teeth health", "Helps maintain muscle strength"],
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Omega-3 Fish Oil",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Supplements",
    badge: "New",
    isOrganic: true,
    isGlutenFree: true,
    dateAdded: "2024-05-28",
    description: "Pure, molecularly distilled fish oil with high EPA and DHA content.",
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Turmeric Curcumin",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Herbs",
    badge: "Sale",
    isVegan: true,
    isOrganic: true,
    isGlutenFree: true,
    dateAdded: "2024-04-10",
    description: "Potent turmeric extract with 95% curcuminoids and black pepper for enhanced absorption.",
    inStock: true,
  },
  {
    id: 4,
    name: "Probiotic Complex - 50 Billion CFU",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Digestive",
    badge: "Popular",
    isVegan: true,
    isGlutenFree: true,
    dateAdded: "2024-03-22",
    description: "Advanced probiotic formula with 12 strains for digestive and immune health.",
    inStock: true,
  },
  {
    id: 5,
    name: "Plant-Based Protein Powder",
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Protein",
    isVegan: true,
    isOrganic: true,
    isGlutenFree: true,
    dateAdded: "2024-05-01",
    description: "Complete amino acid profile from pea, hemp, and rice proteins.",
    inStock: true,
  },
  {
    id: 6,
    name: "Magnesium Glycinate",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.4,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "Minerals",
    isVegan: true,
    isGlutenFree: true,
    dateAdded: "2024-04-20",
    description: "Highly bioavailable magnesium for muscle and nerve function.",
    inStock: true,
  },
]

export class ProductServices {
  private static async simulateDelay(ms = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  static async getAllProducts(): Promise<Product[]> {
    await this.simulateDelay()
    return [...mockProducts]
  }

  static async getProductById(id: string): Promise<Product | null> {
    await this.simulateDelay()
    const product = mockProducts.find((p) => p.id === Number.parseInt(id))
    return product || null
  }

  static async getFilteredProducts(filter: ProductFilter): Promise<Product[]> {
    await this.simulateDelay()
    let filtered = [...mockProducts]

    // Apply category filter
    if (filter.category !== "All") {
      filtered = filtered.filter((p) => p.category === filter.category)
    }

    // Apply price range filters
    if (filter.priceRanges.length > 0) {
      filtered = filtered.filter((product) =>
        filter.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          return product.price >= min && product.price <= (max || 999)
        }),
      )
    }

    // Apply sorting
    switch (filter.sortBy) {
      case "latest":
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case "alphabet-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "alphabet-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  }

  static async searchProducts(query: string): Promise<Product[]> {
    await this.simulateDelay()
    const lowercaseQuery = query.toLowerCase()

    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description?.toLowerCase().includes(lowercaseQuery),
    )
  }

  static async getFeaturedProducts(limit = 4): Promise<Product[]> {
    await this.simulateDelay()
    return mockProducts.filter((product) => product.badge).slice(0, limit)
  }

  static async getRelatedProducts(productId: number, limit = 4): Promise<Product[]> {
    await this.simulateDelay()
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return []

    return mockProducts.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
  }
}
