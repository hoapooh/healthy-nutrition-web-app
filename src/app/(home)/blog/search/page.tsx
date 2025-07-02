import type { Metadata } from "next";
import BlogCard from "@/features/client/blog/ui/components/blog-card";
import BlogPagination from "@/features/client/blog/ui/components/blog-pagination";
import BlogSidebar from "@/features/client/blog/ui/components/blog-sidebar";
import { searchBlogPosts } from "@/features/client/blog/services/blog-api";
import { ArrowLeft } from "lucide-react";

interface BlogSearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogSearchPageProps): Promise<Metadata> {
  const [searchParamsResolved] = await Promise.all([searchParams]);
  const query = searchParamsResolved.q || "";

  return {
    title: query ? `Tìm kiếm: "${query}" - Blog` : "Tìm kiếm - Blog",
    description: query
      ? `Kết quả tìm kiếm cho "${query}" trong blog về dinh dưỡng và sức khỏe.`
      : "Tìm kiếm bài viết trong blog về dinh dưỡng và sức khỏe.",
  };
}

const POSTS_PER_PAGE = 6;

export default async function BlogSearchPage({
  searchParams,
}: BlogSearchPageProps) {
  const [searchParamsResolved] = await Promise.all([searchParams]);
  const query = searchParamsResolved.q || "";
  const currentPage = Number(searchParamsResolved.page) || 1;

  // Get search results
  const searchResults = query ? await searchBlogPosts(query) : [];

  // Calculate pagination
  const totalPosts = searchResults.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = searchResults.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {query ? `Kết quả tìm kiếm cho "${query}"` : "Tìm kiếm bài viết"}
          </h1>
          {query && (
            <p className="mb-4 text-lg text-gray-600">
              Tìm thấy {totalPosts} bài viết phù hợp với từ khóa của bạn.
            </p>
          )}
          {/* Back to All Posts Button */}
          {/* <div className="flex justify-center">
            <a
              href="/blog"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              <ArrowLeft className="size-4" /> Xem tất cả bài viết
            </a>
          </div> */}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentPosts.length > 0 ? (
              <>
                {/* Search Results */}
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
                    baseUrl={`/blog/search?q=${encodeURIComponent(query)}`}
                  />
                )}

                {/* Posts Info */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  Hiển thị {startIndex + 1}-{Math.min(endIndex, totalPosts)}{" "}
                  trong {totalPosts} bài viết
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                {query ? (
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                      Không tìm thấy kết quả nào
                    </h2>
                    <p className="mb-6 text-gray-600">
                      Không có bài viết nào phù hợp với từ khóa "{query}". Hãy
                      thử với từ khóa khác hoặc xem các bài viết mới nhất.
                    </p>
                    <a
                      href="/blog"
                      className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                    >
                      Xem tất cả bài viết
                    </a>
                  </div>
                ) : (
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                      Nhập từ khóa để tìm kiếm
                    </h2>
                    <p className="text-gray-600">
                      Sử dụng ô tìm kiếm bên phải để tìm kiếm bài viết.
                    </p>
                  </div>
                )}
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
