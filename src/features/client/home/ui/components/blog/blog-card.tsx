import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/features/client/home/data/types";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-[300px] w-full overflow-hidden">
          <Image
            src={post.image.src || "/placeholder.svg"}
            alt={post.image.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {post.category.name}
          </Badge>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-3 text-2xl font-bold transition-colors hover:text-green-600">
            {post.title}
          </h2>
        </Link>

        <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>by {post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>

          {post.minutesToRead && (
            <span className="font-medium text-green-600">
              {post.minutesToRead} min read
            </span>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="font-medium text-green-600 hover:underline"
          >
            Read full story...
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
