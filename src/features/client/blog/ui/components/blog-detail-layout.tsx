import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogSidebar from "./blog-sidebar";
import BlogDetailContent from "./blog-detail-content";
import BlogTags from "./blog-tags";
// import BlogShare from "./blog-share";
import RelatedStories from "./related-stories";
import type { BlogPost } from "@/features/client/home/data/types";
import Link from "next/link";

interface BlogDetailLayoutProps {
  post: BlogPost;
}

const BlogDetailLayout = ({ post }: BlogDetailLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách bài viết
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="overflow-hidden rounded-lg bg-white shadow-sm">
              {/* Hero Image with Overlay */}
              <div className="relative h-[400px] overflow-hidden lg:h-[500px]">
                <Image
                  src={post.image.src || "/placeholder.svg"}
                  alt={post.image.alt}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
                  <h1 className="mb-4 text-3xl leading-tight font-bold lg:text-5xl">
                    {post.title}
                  </h1>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {/* <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>No Comments</span>
                    </div> */}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <BlogDetailContent post={post} />

                {/* Tags and Share */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <BlogTags tags={post.tags} />
                    {/* <BlogShare /> */}
                  </div>
                </div>
              </div>
            </article>

            {/* Related Stories */}
            <div className="mt-12">
              <RelatedStories currentPostId={post.id} />
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
};

export default BlogDetailLayout;
