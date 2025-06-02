interface BlogDetailPageProps {
  blogId: string
}

export default function BlogDetailPage({ blogId }: BlogDetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Post Detail</h1>
      <p className="text-gray-600">Blog post {blogId} content will be displayed here.</p>
    </div>
  )
}
