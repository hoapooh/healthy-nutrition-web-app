import BlogCard from "./blog-card";
import type { BlogPost } from "@/features/client/home/data/types";

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList = ({ posts }: BlogListProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
