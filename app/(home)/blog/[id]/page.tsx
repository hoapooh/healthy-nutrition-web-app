import BlogDetailPage from "@/features/client/blog/ui/components/blog-detail-page"

export default function BlogDetail({ params }: { params: { id: string } }) {
  return <BlogDetailPage blogId={params.id} />
}
