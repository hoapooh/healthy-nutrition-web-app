import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Vitamins for Optimal Health",
    excerpt:
      "Discover the most important vitamins your body needs and how to incorporate them into your daily routine for better health and wellness.",
    image: "/placeholder.svg?height=250&width=400",
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    category: "Nutrition",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Benefits of Omega-3 Fatty Acids",
    excerpt:
      "Learn about the incredible health benefits of omega-3 fatty acids and why they're essential for heart health, brain function, and more.",
    image: "/placeholder.svg?height=250&width=400",
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Supplements",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Building a Sustainable Wellness Routine",
    excerpt:
      "Create lasting healthy habits with our comprehensive guide to building a wellness routine that fits your lifestyle and goals.",
    image: "/placeholder.svg?height=250&width=400",
    author: "Emma Wilson",
    date: "2024-01-10",
    category: "Lifestyle",
    readTime: "6 min read",
  },
]

export default function BlogPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest health tips, product reviews, and wellness advice from our team of experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white text-green-600 px-2 py-1 text-xs font-semibold rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">{post.readTime}</span>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/blog/${post.id}`} className="flex items-center gap-1">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
