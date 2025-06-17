import HomeBlog from "@/features/client/home/ui/components/home-blog";
import { getBlogPosts } from "@/features/client/home/data/blog-data";

const HomeBlogSection = async () => {
  const posts = await getBlogPosts();

  const formattedPosts = posts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    date: post.date,
    minutesToRead: post.minutesToRead,
    image: post.image,
    slug: post.slug,
  }));

  return (
    <HomeBlog
      badge="Latest Articles"
      heading="From Our Blog"
      description="Stay updated with the latest news and articles from our blog."
      posts={formattedPosts}
    />
  );
};

export default HomeBlogSection;
