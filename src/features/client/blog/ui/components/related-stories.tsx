"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBlogPosts } from "@/features/client/blog/services/blog-api";
import type { BlogPost } from "@/features/client/home/data/types";

interface RelatedStoriesProps {
  currentPostId: string;
}

const RelatedStories = ({ currentPostId }: RelatedStoriesProps) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      const allPosts = await getBlogPosts();
      // Lọc ra các bài viết liên quan (không bao gồm bài hiện tại)
      // và lấy tối đa 3 bài
      const related = allPosts
        .filter((post) => post.id !== currentPostId)
        .slice(0, 3);

      setRelatedPosts(related);
    };

    fetchRelatedPosts();
  }, [currentPostId]);

  if (relatedPosts.length === 0) return null;

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Related Stories</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all group-hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image.src || "/placeholder.svg"}
                  alt={post.image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-green-600">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedStories;
