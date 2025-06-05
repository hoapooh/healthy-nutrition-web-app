import BlogSearch from "./blog-search";
import BlogRecentPosts from "./blog-recent-posts";
import BlogPopularTags from "./blog-popular-tags";
import BlogSocialLinks from "./blog-social-links";
import {
  getRecentPosts,
  getPopularTags,
} from "@/features/client/home/data/blog-data";

const BlogSidebar = async () => {
  const [recentPosts, tags] = await Promise.all([
    getRecentPosts(),
    getPopularTags(),
  ]);

  return (
    <aside className="space-y-8">
      <BlogSearch />
      <BlogRecentPosts posts={recentPosts} />
      <BlogPopularTags tags={tags} />
      <BlogSocialLinks />
    </aside>
  );
};

export default BlogSidebar;
