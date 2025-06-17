import BlogHeader from "./blog-header";
import BlogList from "./blog-list";
import BlogSidebar from "./blog-sidebar";
import BlogPagination from "./blog-pagination";
import type { BlogPost } from "@/features/client/home/data/types";

interface BlogLayoutProps {
  posts: BlogPost[];
  currentPage?: number;
  totalPages?: number;
}

const BlogLayout = ({
  posts,
  currentPage = 1,
  totalPages = 3,
}: BlogLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <BlogHeader title="Latest News" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BlogList posts={posts} />
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        </div>

        <div className="mt-8 lg:mt-0">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
