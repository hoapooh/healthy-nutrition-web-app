import BlogLayout from "@/features/client/home/ui/components/blog/blog-layout";
import { getBlogPosts } from "@/features/client/home/data/blog-data";

export const metadata = {
  title: "Blog | Our Food Journey",
  description:
    "Discover delicious recipes, cooking tips, and healthy eating guides",
};

const BlogPage = async () => {
  const posts = await getBlogPosts();

  return <BlogLayout posts={posts} />;
};

export default BlogPage;
