export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  category: string
  badge?: string
  isVegan?: boolean
  isOrganic?: boolean
  isGlutenFree?: boolean
  dateAdded: string
  description?: string
  ingredients?: string
  benefits?: string[]
  inStock?: boolean
}

export interface ProductFilter {
  category: string
  priceRanges: string[]
  sortBy: string
}

export interface SortOption {
  label: string
  value: string
}
