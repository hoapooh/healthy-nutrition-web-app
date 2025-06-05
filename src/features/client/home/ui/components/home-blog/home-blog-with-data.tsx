import HomeBlog from "./index";
import { getHomeBlogData } from "@/features/client/home/data/blog-data";

const HomeBlogWithData = async () => {
  const blogData = await getHomeBlogData();

  return (
    <HomeBlog
      badge="Latest Articles"
      heading="From Our Blog"
      description="Stay updated with the latest news and articles from our blog."
      posts={blogData}
    />
  );
};

export default HomeBlogWithData;
