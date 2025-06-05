import type { BlogPost, Tag, HomeBlogCardData } from "./types";

// Mock data for blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return [
    {
      id: "1",
      title: "Delicious Vegan Recipes For Tasty And Exciting Meals",
      slug: "delicious-vegan-recipes",
      excerpt:
        "Fusce vitae augue tortor. Integer ultrices vulputate nisl, nec suscipit leo aliquam vitae. Morbi est urna, tincidunt eget finibus eu, bibendum in mauris. Mauris varius augue non nisl ullamcorper, id fringilla est condimentum.",
      content: "Full content here...",
      image: {
        src: "/images/blog/vegan-recipes.jpg",
        alt: "Delicious vegan burgers with spinach and vegetables",
      },
      date: "24th July 2018",
      author: {
        id: "1",
        name: "Mike Andrews",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: {
        id: "1",
        name: "Recipe Ideas",
        slug: "recipe-ideas",
      },
      tags: [
        { id: "1", name: "Vegan", slug: "vegan" },
        { id: "2", name: "Recipes", slug: "recipes" },
      ],
      minutesToRead: 10,
    },
    {
      id: "2",
      title: "10 Great Dishes To Cook With The Little Ones",
      slug: "cooking-with-kids",
      excerpt:
        "Fusce vitae augue tortor. Integer ultrices vulputate nisl, nec suscipit leo aliquam vitae. Morbi est urna, tincidunt eget finibus eu, bibendum in mauris. Mauris varius augue non nisl ullamcorper, id fringilla est condimentum.",
      content: "Full content here...",
      image: {
        src: "/images/blog/cooking-with-kids.jpg",
        alt: "Father and daughter cooking together in kitchen",
      },
      date: "24th July 2018",
      author: {
        id: "1",
        name: "Mike Andrews",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: {
        id: "1",
        name: "Recipe Ideas",
        slug: "recipe-ideas",
      },
      tags: [
        { id: "3", name: "Children", slug: "children" },
        { id: "4", name: "Cooking", slug: "cooking" },
        { id: "5", name: "Family", slug: "family" },
      ],
      minutesToRead: 8,
    },
    {
      id: "3",
      title: "The Most Delicious And Easy To Make Smoothies",
      slug: "delicious-smoothies",
      excerpt:
        "Discover amazing smoothie recipes that are both nutritious and delicious. Perfect for breakfast or as a healthy snack throughout the day.",
      content: "Full content here...",
      image: {
        src: "/images/blog/smoothies.png",
        alt: "Colorful smoothies in glasses",
      },
      date: "20th July 2018",
      author: {
        id: "1",
        name: "Mike Andrews",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: {
        id: "1",
        name: "Recipe Ideas",
        slug: "recipe-ideas",
      },
      tags: [
        { id: "20", name: "Smoothie", slug: "smoothie" },
        { id: "9", name: "Healthy", slug: "healthy" },
      ],
      minutesToRead: 5,
    },
  ];
};

// Data cho homepage blog section
export const getHomeBlogData = async (): Promise<HomeBlogCardData[]> => {
  const posts = await getBlogPosts();

  return posts.slice(0, 3).map((post) => ({
    title: post.title,
    description: post.excerpt,
    date: post.date,
    minutesToRead: post.minutesToRead,
    image: post.image,
    slug: post.slug,
  }));
};

// Mock data for recent posts (sidebar)
export const getRecentPosts = async (): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.slice(0, 3);
};

// Mock data for popular tags
export const getPopularTags = async (): Promise<Tag[]> => {
  return [
    { id: "1", name: "Children", slug: "children" },
    { id: "2", name: "Cooking", slug: "cooking" },
    { id: "3", name: "Drink", slug: "drink" },
    { id: "4", name: "Family", slug: "family" },
    { id: "5", name: "Feast", slug: "feast" },
    { id: "6", name: "Food", slug: "food" },
    { id: "7", name: "Garden", slug: "garden" },
    { id: "8", name: "Grow", slug: "grow" },
    { id: "9", name: "Healthy", slug: "healthy" },
    { id: "10", name: "Home", slug: "home" },
    { id: "11", name: "Juice", slug: "juice" },
    { id: "12", name: "Kids", slug: "kids" },
    { id: "13", name: "Meal", slug: "meal" },
    { id: "14", name: "Nuts", slug: "nuts" },
    { id: "15", name: "Organic", slug: "organic" },
    { id: "16", name: "Plant based", slug: "plant-based" },
    { id: "17", name: "Recipe", slug: "recipe" },
    { id: "18", name: "Recipes", slug: "recipes" },
    { id: "19", name: "Salad", slug: "salad" },
    { id: "20", name: "Smoothie", slug: "smoothie" },
    { id: "21", name: "Snacks", slug: "snacks" },
    { id: "22", name: "Soup", slug: "soup" },
    { id: "23", name: "Vegan", slug: "vegan" },
    { id: "24", name: "Vegetables", slug: "vegetables" },
    { id: "25", name: "Vegetarian", slug: "vegetarian" },
  ];
};

// Helper function để lấy blog post theo slug
export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
};

// Helper function để lấy blog posts theo category
export const getBlogPostsByCategory = async (
  categorySlug: string,
): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category.slug === categorySlug);
};

// Helper function để lấy blog posts theo tag
export const getBlogPostsByTag = async (
  tagSlug: string,
): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
};

// Helper function để search blog posts
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) =>
        tag.name.toLowerCase().includes(lowercaseQuery),
      ) ||
      post.category.name.toLowerCase().includes(lowercaseQuery),
  );
};
