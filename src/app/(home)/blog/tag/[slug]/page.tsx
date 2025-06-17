import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostsByTag,
  getPopularTags,
} from "@/features/client/blog/services/blog-api";
import BlogCard from "@/features/client/blog/ui/components/blog-card";
import BlogPagination from "@/features/client/blog/ui/components/blog-pagination";
import BlogSidebar from "@/features/client/blog/ui/components/blog-sidebar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const allTags = await getPopularTags();
  const tag = allTags.find(async (t) => t.slug === (await params).slug);

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The requested tag could not be found.",
    };
  }

  return {
    title: `${tag.name} Articles - Blog`,
    description: `Discover articles and recipes tagged with ${tag.name}.`,
  };
}

const POSTS_PER_PAGE = 3;

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const [paramsResolved, searchParamsResolved] = await Promise.all([
    params,
    searchParams,
  ]);

  const currentPage = Number(searchParamsResolved.page) || 1;
  const allTags = await getPopularTags();
  const tag = allTags.find(async (t) => t.slug === (await paramsResolved).slug);

  if (!tag) {
    notFound();
  }

  const allPosts = await getBlogPostsByTag(paramsResolved.slug);

  // Calculate pagination
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4">
            <Badge
              variant="secondary"
              className="bg-green-100 px-4 py-2 text-lg text-green-800"
            >
              #{tag.name}
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Articles tagged with &quot;{tag.name}&quot;
          </h1>
          <p className="text-lg text-gray-600">
            {totalPosts} article{totalPosts !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentPosts.length > 0 ? (
              <>
                {/* Blog Posts Grid */}
                <div className="space-y-8">
                  {currentPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={`/blog/tag/${paramsResolved.slug}`}
                  />
                )}

                {/* Posts Info */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of{" "}
                  {totalPosts} articles
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">📝</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No articles found
                </h3>
                <p className="mb-4 text-gray-600">
                  There are no articles tagged with &quot;{tag.name}&quot; yet.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Link href="/blog">Browse All Articles</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
