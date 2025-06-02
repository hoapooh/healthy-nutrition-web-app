"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SearchInput from "./search-input"
import { useCart } from "@/features/client/shared/hooks/use-cart"
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants"

const FILTER_BUTTONS = [
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Organic", value: "organic" },
  { label: "Gluten-free", value: "gluten-free" },
] as const

export default function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems, setIsOpen: setCartOpen } = useCart()

  const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Implement search logic
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b">
          <div />
          <nav className="flex items-center gap-4">
            {[
              { href: "/login", label: "Login" },
              { href: "/create-account", label: "Create Account" },
              { href: "/help", label: "Help" },
              { href: "/contact", label: "Contact Us" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-green-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-green-600">
              {SITE_CONFIG.name}
            </Link>
            <p className="text-sm text-gray-500 hidden sm:block">{SITE_CONFIG.tagline}</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <SearchInput placeholder="Search products..." onSearch={handleSearch} className="w-full" />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-auto min-w-[20px] px-1 text-xs bg-green-600">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="hidden md:flex items-center justify-end space-x-2 pb-4">
          {FILTER_BUTTONS.map((filter) => (
            <Button
              key={filter.value}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <SearchInput placeholder="Search products..." onSearch={handleSearch} className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
