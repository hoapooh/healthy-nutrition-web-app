import { notFound } from "next/navigation";
import BlogDetailLayout from "@/features/client/home/ui/components/blog/blog-detail-layout";
import { getBlogPostBySlug } from "@/features/client/home/data/blog-data";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Our Food Journey`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image.src],
    },
  };
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailLayout post={post} />;
};

export default BlogDetailPage;
