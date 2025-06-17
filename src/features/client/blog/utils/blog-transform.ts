import { Blog } from "@/types/blog";

// Helper function to create slug from title
export const createSlugFromTitle = (title: string, id: string): string => {
  const slugFromTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return slugFromTitle || id;
};

// Helper function to find blog ID from slug
export const findBlogIdFromSlug = async (
  slug: string,
  blogs: Blog[],
): Promise<string | null> => {
  // First try to find by exact ID match
  const blogById = blogs.find((blog) => blog.id === slug);
  if (blogById) return blogById.id;

  // Then try to find by generated slug
  const blogBySlug = blogs.find(
    (blog) => createSlugFromTitle(blog.title, blog.id) === slug,
  );
  return blogBySlug?.id || null;
};
