import { Blog } from "@/types/blog";
import { BlogPost } from "../../home/data/types";

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

// Transform Blog to BlogPost format
export const transformBlogToBlogPost = (blog: Blog): BlogPost => {
  // Use first image from images array or fallback
  const imageUrl =
    blog.images && blog.images.length > 0 ? blog.images[0] : "/placeholder.svg";

  // Calculate estimated reading time (roughly 200 words per minute)
  const wordCount = blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutesToRead = Math.max(1, Math.ceil(wordCount / 200));

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    id: blog.id,
    title: blog.title,
    slug: createSlugFromTitle(blog.title, blog.id),
    excerpt: blog.excerpt,
    content: blog.content,
    image: {
      src: imageUrl,
      alt: blog.title,
    },
    date: formatDate(blog.createdAt),
    tags: blog.tags,
    minutesToRead,
  };
};
