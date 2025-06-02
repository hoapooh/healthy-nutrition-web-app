export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  authorAvatar: string
  date: string
  category: string
  comments: string
  featured: boolean
  readTime?: string
}

export interface BlogFilter {
  category: string
  searchTerm: string
}
