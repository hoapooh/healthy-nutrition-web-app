import type { BlogPost, BlogFilter } from "@/types/blog"

// Mock data - replace with actual API calls
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Delicious Vegan Recipes For Tasty And Exciting Meals",
    excerpt: "Fusce vitae augue tortor. Integer ultrices vulputate nisl, nec suscipit leo aliquam vitae...",
    content: "Full blog post content here...",
    image: "/placeholder.svg?height=400&width=600",
    author: "Mike Andrews",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "24th July 2018",
    category: "Recipe Ideas",
    comments: "No Comments",
    featured: true,
  },
  // Add more blog posts...
]

export class BlogServices {
  static async getAllBlogPosts(): Promise<BlogPost[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBlogPosts), 500)
    })
  }

  static async getBlogPostById(id: string): Promise<BlogPost | null> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = mockBlogPosts.find((p) => p.id === Number.parseInt(id))
        resolve(post || null)
      }, 500)
    })
  }

  static async getFilteredBlogPosts(filter: BlogFilter): Promise<BlogPost[]> {
    // Simulate API call with filtering
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockBlogPosts]

        if (filter.category !== "All") {
          filtered = filtered.filter((p) => p.category === filter.category)
        }

        if (filter.searchTerm) {
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
              p.excerpt.toLowerCase().includes(filter.searchTerm.toLowerCase()),
          )
        }

        resolve(filtered)
      }, 500)
    })
  }
}
