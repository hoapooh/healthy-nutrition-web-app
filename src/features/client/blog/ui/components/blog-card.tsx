import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/features/client/home/data/types";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image.src || "/placeholder.svg"}
            alt={post.image.alt}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors hover:text-green-600">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          {post.minutesToRead && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.minutesToRead} min read</span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <div className="mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline"
          >
            Tiếp tục đọc...
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
