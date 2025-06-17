import type { Metadata } from "next";
import BlogCard from "@/features/client/blog/ui/components/blog-card";
import BlogPagination from "@/features/client/blog/ui/components/blog-pagination";
import BlogSidebar from "@/features/client/blog/ui/components/blog-sidebar";
import { getBlogPosts } from "@/features/client/blog/services/blog-api";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Blog - Latest Articles and Recipes",
  description:
    "Discover the latest articles about cooking, nutrition, and healthy living.",
};

const POSTS_PER_PAGE = 3;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [searchParamsResolved] = await Promise.all([searchParams]);
  const currentPage = Number(searchParamsResolved.page) || 1;

  // Get all posts with pagination from API
  const allPosts = await getBlogPosts({
    pageIndex: currentPage,
    limit: POSTS_PER_PAGE * 10,
  });

  // Calculate pagination
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Bài viết mới nhất
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá công thức, mẹo nấu ăn và lời khuyên về lối sống lành mạnh
            từ các chuyên gia của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Blog Posts Grid */}
            <div className="space-y-8">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/blog"
            />

            {/* Posts Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Hiển thị {startIndex + 1}-{Math.min(endIndex, totalPosts)} trong{" "}
              {totalPosts} bài viết
            </div>
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
