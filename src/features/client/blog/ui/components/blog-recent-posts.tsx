import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/features/client/home/data/types";

interface BlogRecentPostsProps {
  posts: BlogPost[];
}

const BlogRecentPosts = ({ posts }: BlogRecentPostsProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Recent News</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="flex gap-3">
            <Link href={`/blog/${post.slug}`} className="shrink-0">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image
                  src={post.image.src || "/placeholder.svg"}
                  alt={post.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="mb-1 line-clamp-2 text-sm leading-tight font-medium transition-colors hover:text-green-600">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                {/* <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="text-green-600 hover:underline"
                >
                  {post.category.name}
                </Link> */}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogRecentPosts;
