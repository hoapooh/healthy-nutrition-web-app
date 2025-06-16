import Link from "next/link";
import type { BlogPost } from "@/features/client/home/data/types";
import Image from "next/image";

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Recent News</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex gap-3">
            <Link href={`/blog/${post.slug}`} className="shrink-0">
              <div className="relative h-20 w-20 overflow-hidden rounded">
                <Image
                  src={post.image.src || "/placeholder.svg"}
                  alt={post.image.alt}
                  className="h-full w-full object-cover"
                  width={80}
                  height={80}
                />
              </div>
            </Link>
            <div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="line-clamp-2 font-medium transition-colors hover:text-green-600">
                  {post.title}
                </h3>
              </Link>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.date}</span>
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="text-xs text-green-600 hover:underline"
                >
                  {post.category.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
