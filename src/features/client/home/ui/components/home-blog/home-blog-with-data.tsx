import HomeBlog from "./index";

const HomeBlogWithData = async () => {
  // The HomeBlog component now fetches its own data with the hook
  return (
    <HomeBlog
      badge="Latest Articles"
      heading="From Our Blog"
      description="Stay updated with the latest news and articles from our blog."
    />
  );
};

export default HomeBlogWithData;
