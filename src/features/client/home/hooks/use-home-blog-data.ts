import { useGetAllBlogsQuery } from "@/services/blog-services";

export const useHomeBlogData = () => {
  // Fetch latest 3 blogs for homepage
  const {
    data: blogsResponse,
    isLoading,
    error,
  } = useGetAllBlogsQuery({
    pageIndex: 1,
    limit: 3,
  });

  const blogs = blogsResponse?.result?.items || [];

  return {
    blogs,
    isLoading,
    error,
    totalCount: blogsResponse?.result?.totalCount || 0,
  };
};
