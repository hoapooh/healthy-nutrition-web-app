import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BlogSidebar from "./blog-sidebar";
import BlogDetailContent from "./blog-detail-content";
import type { BlogPost } from "@/features/client/home/data/types";

interface BlogDetailFixedLayoutProps {
  post: BlogPost;
}

const BlogDetailFixedLayout = ({ post }: BlogDetailFixedLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="overflow-hidden rounded-lg border bg-white">
            {/* Featured Image */}
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src={post.image.src || "/placeholder.svg"}
                alt={post.image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Category Badge */}
              <div className="mb-4">
                <Badge variant="secondary" className="text-sm">
                  {post.category.name}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>by {post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                {post.minutesToRead && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.minutesToRead} min read</span>
                  </div>
                )}
              </div>

              <Separator className="mb-8" />

              {/* Dynamic Content */}
              <BlogDetailContent post={post} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 border-t pt-8">
                  <h3 className="mb-4 text-lg font-semibold">Related Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm transition-colors hover:bg-green-100 hover:text-green-700"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-8 border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Share this article
                </h3>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-[#3b5998] hover:bg-[#3b5998]/90"
                  >
                    Facebook
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
                  >
                    Twitter
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#0077b5] hover:bg-[#0077b5]/90"
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="mt-8 lg:mt-0">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailFixedLayout;
