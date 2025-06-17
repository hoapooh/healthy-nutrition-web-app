"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Newspaper } from "lucide-react";
import HomeBlogCard from "./home-blog-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHomeBlogData } from "../../../hooks/use-home-blog-data";

interface HomeBlogProps {
  badge?: string;
  heading?: string;
  description?: string;
}

const HomeBlog = ({
  badge = "Bài viết mới nhất",
  heading = "From Our Blog",
  description = "Stay updated with the latest news and articles from our blog.",
}: HomeBlogProps) => {
  const { blogs, isLoading, error } = useHomeBlogData();
  return (
    <section className="px-2 py-16 lg:px-0 lg:pt-32 lg:pb-0">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <Badge variant={"outline"}>
            <Newspaper className="size-3" />
            {badge}
          </Badge>
          <h2 className="mt-4 text-center text-2xl font-bold lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-center text-base font-semibold text-green-600 lg:text-sm">
            {description}
          </p>
        </div>{" "}
        {/* Body Cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-md border border-gray-200 p-2 shadow-sm"
              >
                <div className="h-40 w-full animate-pulse rounded-md bg-gray-200"></div>
                <div className="mt-2 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-3 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center">
              <p className="text-gray-500">
                Unable to load blog posts at the moment.
              </p>
            </div>
          ) : blogs && blogs.length > 0 ? (
            // Real data
            blogs.map((blog) => (
              <HomeBlogCard
                key={`blog-card-${blog.id}`}
                title={blog.title}
                description={blog.excerpt}
                date={new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                minutesToRead={Math.max(
                  1,
                  Math.ceil(
                    blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length /
                      200,
                  ),
                )}
                image={{
                  src:
                    blog.images && blog.images.length > 0
                      ? blog.images[0]
                      : "/placeholder.svg",
                  alt: blog.title,
                }}
                slug={blog.slug}
              />
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center">
              <p className="text-gray-500">No blog posts available yet.</p>
            </div>
          )}
        </div>
        {/* View All Blogs */}
        <div className="mt-12 text-center">
          <Link href={"/blog"} className="text-sm font-semibold">
            <Button
              variant={"outline"}
              className="hover:cursor-pointer hover:text-green-600/90"
            >
              View All Blogs <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
