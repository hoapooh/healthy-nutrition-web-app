export const SITE_CONFIG = {
  name: "RawOrganic",
  description: "Natural Products for Better Living",
  tagline: "Natural Food, Healthy Living",
  url: "https://raworganic.com",
  author: "RawOrganic Team",
} as const

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const

export const PRODUCT_CATEGORIES = [
  "All",
  "Vitamins",
  "Supplements",
  "Herbs",
  "Digestive",
  "Protein",
  "Minerals",
] as const

export const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Alphabet: A-Z", value: "alphabet-asc" },
  { label: "Alphabet: Z-A", value: "alphabet-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
] as const

export const PRICE_RANGES = [
  { label: "Under £25", min: 0, max: 25 },
  { label: "£25 - £50", min: 25, max: 50 },
  { label: "£50 - £75", min: 50, max: 75 },
  { label: "Over £75", min: 75, max: 999 },
] as const

export const BLOG_CATEGORIES = ["All", "Recipe Ideas", "Healthy News", "Nutrition Tips", "Lifestyle"] as const
