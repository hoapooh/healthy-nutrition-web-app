import { Blog } from "@/types/blog";
import { BlogPost, Tag } from "../../home/data/types";

// Helper function to create tag slug from name
const createTagSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
};

// Helper function to transform string tags to Tag objects
const transformTagsToObjects = (tagStrings: string[]): Tag[] => {
  return tagStrings.map((tagName, index) => ({
    id: `tag-${index}-${createTagSlug(tagName)}`,
    name: tagName,
    slug: createTagSlug(tagName),
  }));
};

// Transform Blog to BlogPost format helper function
const transformBlogToBlogPost = (blog: Blog): BlogPost => {
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
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    image: {
      src: imageUrl,
      alt: blog.title,
    },
    date: formatDate(blog.createdAt),
    tags: transformTagsToObjects(blog.tags),
    minutesToRead,
  };
};

// Server-side function to get blog by slug
const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}blogs?slug=${slug}`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const blogs: Blog[] = data.result?.items || [];

    if (blogs.length === 0) {
      return null;
    }

    return transformBlogToBlogPost(blogs[0]);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

// Server-side function to get all blog posts
const getBlogPosts = async (params?: {
  pageIndex?: number;
  limit?: number;
  searchTerm?: string;
  tags?: string[];
}): Promise<BlogPost[]> => {
  try {
    const searchParams = new URLSearchParams();

    if (params?.pageIndex)
      searchParams.set("pageIndex", params.pageIndex.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.searchTerm) searchParams.set("searchTerm", params.searchTerm);
    if (params?.tags && params.tags.length > 0) {
      params.tags.forEach((tag) => searchParams.append("tags", tag));
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}blogs?${searchParams.toString()}`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      },
    );

    if (!response.ok) {
      console.error("Failed to fetch blogs:", response.statusText);
      return [];
    }

    const data = await response.json();
    const blogs: Blog[] = data.result?.items || [];

    return blogs.map(transformBlogToBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

// Server-side function to get blog posts by tag
const getBlogPostsByTag = async (tagSlug: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getBlogPosts({ limit: 100 });

    // Filter posts that have a tag with the matching slug
    return allPosts.filter((post) =>
      post.tags.some((tag) => tag.slug === tagSlug),
    );
  } catch (error) {
    console.error("Error fetching blogs by tag:", error);
    return [];
  }
};

// Server-side function to get popular tags
const getPopularTags = async (): Promise<Tag[]> => {
  try {
    const posts = await getBlogPosts({ limit: 100 }); // Get more posts to analyze tags
    const tagMap = new Map<string, { tag: Tag; count: number }>();

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const existing = tagMap.get(tag.slug);
        if (existing) {
          existing.count += 1;
        } else {
          tagMap.set(tag.slug, { tag, count: 1 });
        }
      });
    });

    return Array.from(tagMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((entry) => entry.tag);
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    return [];
  }
};

// Server-side function to search blog posts
const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    return await getBlogPosts({ searchTerm: query });
  } catch (error) {
    console.error("Error searching blog posts:", error);
    return [];
  }
};

// Server-side function to get blogs for homepage
const getHomeBlogData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}blogs?pageIndex=1&limit=3`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      },
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const blogs: Blog[] = data.result?.items || [];

    return blogs.map((blog) => ({
      image: {
        src:
          blog.images && blog.images.length > 0
            ? blog.images[0]
            : "/placeholder.svg",
        alt: blog.title,
      },
      title: blog.title,
      description: blog.excerpt,
      minutesToRead: Math.max(
        1,
        Math.ceil(
          blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200,
        ),
      ),
      date: new Date(blog.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error fetching home blog data:", error);
    return [];
  }
};

export {
  getBlogPostBySlug,
  getBlogPosts,
  getBlogPostsByTag,
  getPopularTags,
  searchBlogPosts,
  getHomeBlogData,
};
