"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "Delicious Vegan Recipes For Tasty And Exciting Meals",
    excerpt:
      "Fusce vitae augue tortor. Integer ultrices vulputate nisl, nec suscipit leo aliquam vitae. Morbi est urna, tincidunt eget finibus eu, bibendum in mauris. Mauris varius augue non nisl ullamcorper, id fringilla est condimentum. Fusce ipsum eros, porta eget ex quis, pellentesque ultrices dolor. Phasellus faucibus hendrerit diam sed consectetur. Ut hendrerit ut velit id sagittis. Nam eget scelerisque lectus, ut tempus dui...",
    image: "/placeholder.svg?height=400&width=600",
    author: "Mike Andrews",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "24th July 2018",
    category: "Recipe Ideas",
    comments: "No Comments",
    featured: true,
  },
  {
    id: 2,
    title: "The Most Delicious And Easy To Make Smoothies",
    excerpt:
      "Fusce vitae augue tortor. Integer ultrices vulputate nisl, nec suscipit leo aliquam vitae. Morbi est urna, tincidunt eget finibus eu, bibendum in mauris. Mauris varius augue non nisl ullamcorper, id fringilla est condimentum. Fusce ipsum eros, porta eget ex quis, pellentesque ultrices dolor. Phasellus faucibus hendrerit diam sed consectetur. Ut hendrerit ut velit id sagittis. Nam eget scelerisque lectus, ut tempus dui...",
    image: "/placeholder.svg?height=400&width=600",
    author: "Mike Andrews",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "24th July 2018",
    category: "Recipe Ideas",
    comments: "No Comments",
    featured: false,
  },
  {
    id: 3,
    title: "The Suprising Vegetables You Can Grown In Your Own Garden!",
    excerpt:
      "Fusce vitae augue tortor. Integer ultrices vulputate nisl, nec suscipit leo aliquam vitae. Morbi est urna, tincidunt eget finibus eu, bibendum in mauris. Mauris varius augue non nisl ullamcorper, id fringilla est condimentum. Fusce ipsum eros, porta eget ex quis, pellentesque ultrices dolor. Phasellus faucibus hendrerit diam sed consectetur. Ut hendrerit ut velit id sagittis. Nam eget scelerisque lectus, ut tempus dui...",
    image: "/placeholder.svg?height=400&width=600",
    author: "Mike Andrews",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "24th July 2018",
    category: "Healthy News",
    comments: "No Comments",
    featured: false,
  },
]

const recentNews = [
  {
    id: 1,
    title: "Delicious Vegan Recipes For Tasty And Exciting Meals",
    date: "24th July 2018",
    category: "Recipe Ideas",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "The Most Delicious And Easy To Make Smoothies",
    date: "24th July 2018",
    category: "Recipe Ideas",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "The Suprising Vegetables You Can Grown In Your Own Garden!",
    date: "24th July 2018",
    category: "Healthy News",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const popularTags = [
  "Children",
  "Cooking",
  "Drink",
  "Family",
  "Feast",
  "Food",
  "Garden",
  "Grow",
  "Healthy",
  "Home",
  "Juice",
  "Kids",
  "Meal",
  "Nuts",
  "Organic",
  "Plant based",
  "Recipe",
  "Recipes",
  "Salad",
  "Smoothie",
  "Snacks",
  "Soup",
  "Vegan",
  "Vegetables",
  "Vegetarian",
]

const socialLinks = [
  { name: "Facebook", color: "bg-blue-600", href: "#" },
  { name: "YouTube", color: "bg-red-600", href: "#" },
  { name: "Twitter", color: "bg-blue-400", href: "#" },
  { name: "Google+", color: "bg-red-500", href: "#" },
  { name: "LinkedIn", color: "bg-blue-700", href: "#" },
  { name: "Instagram", color: "bg-pink-500", href: "#" },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h1>

          {/* Featured Post */}
          {featuredPost && (
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="p-6 text-white">
                      <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={featuredPost.authorAvatar || "/placeholder.svg"}
                        alt={featuredPost.author}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-sm text-gray-600">by {featuredPost.author}</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{featuredPost.comments}</span>
                    <span className="text-sm text-gray-500">{featuredPost.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <Link href={`/blog/${featuredPost.id}`} className="text-green-600 hover:text-green-700 font-medium">
                    Read full story...
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regular Posts */}
          <div className="space-y-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="p-6 text-white">
                        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.authorAvatar || "/placeholder.svg"}
                          alt={post.author}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-sm text-gray-600">by {post.author}</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{post.comments}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`} className="text-green-600 hover:text-green-700 font-medium">
                      Read full story...
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="ghost"
              size="sm"
              className={currentPage === 1 ? "text-green-600 font-bold" : "text-gray-500"}
              onClick={() => setCurrentPage(1)}
            >
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={currentPage === 2 ? "text-green-600 font-bold" : "text-gray-500"}
              onClick={() => setCurrentPage(2)}
            >
              2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={currentPage === 3 ? "text-green-600 font-bold" : "text-gray-500"}
              onClick={() => setCurrentPage(3)}
            >
              3
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              {">"}
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search Blog */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Search Blog</h3>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search Keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent News</h3>
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div key={news.id} className="flex gap-3">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{news.title}</h4>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{news.date}</span>
                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                          {news.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 hover:bg-green-50 hover:border-green-600 hover:text-green-600"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Follow Us */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <div className="grid grid-cols-3 gap-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`${social.color} text-white text-xs font-medium py-2 px-3 rounded text-center hover:opacity-90 transition-opacity`}
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
