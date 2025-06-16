import type { BlogPost, Tag, HomeBlogCardData } from "./types";

// Mock data for blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return [
    {
      id: "1",
      title: "Delicious Vegan Recipes For Tasty And Exciting Meals",
      slug: "delicious-vegan-recipes",
      excerpt:
        "Discover amazing plant-based recipes that will transform your dining experience. These vegan dishes are packed with flavor and nutrition.",
      content: "Full content here...",
      image: {
        src: "/images/blog/vegan-recipes.jpg",
        alt: "Delicious vegan burgers with spinach and vegetables",
      },
      date: "24th July 2023",
      author: {
        id: "1",
        name: "Mike Andrews",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
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
        "Cooking with children is not just fun but also educational. Discover 10 kid-friendly recipes that are easy to make and will create lasting memories.",
      content: "Full content here...",
      image: {
        src: "/images/blog/cooking-with-kids.jpg",
        alt: "Father and daughter cooking together in kitchen",
      },
      date: "15th August 2023",
      author: {
        id: "1",
        name: "Mike Andrews",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
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
      date: "20th July 2023",
      author: {
        id: "1",
        name: "Mike Andrews",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
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
    {
      id: "4",
      title: "Seasonal Cooking: Making the Most of Autumn Harvest",
      slug: "seasonal-cooking-autumn-harvest",
      excerpt:
        "Learn how to embrace seasonal cooking with these delicious autumn recipes that highlight the best produce of the season.",
      content: "Full content here...",
      image: {
        src: "/images/blog/autumn-seasonal-produce.jpg",
        alt: "Autumn harvest vegetables and fruits arranged on a rustic table",
      },
      date: "5th September 2023",
      author: {
        id: "2",
        name: "Sarah Johnson",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "1",
        name: "Recipe Ideas",
        slug: "recipe-ideas",
      },
      tags: [
        { id: "6", name: "Seasonal", slug: "seasonal" },
        { id: "7", name: "Autumn", slug: "autumn" },
        { id: "8", name: "Vegetables", slug: "vegetables" },
      ],
      minutesToRead: 7,
    },
    {
      id: "5",
      title: "The Art of Homemade Bread: Simple Techniques for Beginners",
      slug: "homemade-bread-beginners",
      excerpt:
        "Discover the joy of baking your own bread with these foolproof techniques and recipes that even beginners can master.",
      content: "Full content here...",
      image: {
        src: "/images/blog/homemade-bread-beginners.png?height=400&width=600",
        alt: "Freshly baked artisan bread on wooden board",
      },
      date: "12th October 2023",
      author: {
        id: "3",
        name: "Thomas Baker",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "1",
        name: "Recipe Ideas",
        slug: "recipe-ideas",
      },
      tags: [
        { id: "10", name: "Baking", slug: "baking" },
        { id: "11", name: "Bread", slug: "bread" },
        { id: "12", name: "Homemade", slug: "homemade" },
      ],
      minutesToRead: 12,
    },
    {
      id: "6",
      title: "Superfoods: Separating Facts from Marketing Hype",
      slug: "superfoods-facts-marketing",
      excerpt:
        "An evidence-based look at popular superfoods, examining which ones truly deserve their health halos and which are mostly marketing.",
      content: "Full content here...",
      image: {
        src: "/images/blog/superfoods-facts-marketing.jpg?height=400&width=600",
        alt: "Assortment of colorful superfoods in bowls",
      },
      date: "3rd November 2023",
      author: {
        id: "4",
        name: "Dr. Elena Martinez",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "2",
        name: "Nutrition Science",
        slug: "nutrition-science",
      },
      tags: [
        { id: "9", name: "Healthy", slug: "healthy" },
        { id: "13", name: "Superfoods", slug: "superfoods" },
        { id: "14", name: "Nutrition", slug: "nutrition" },
      ],
      minutesToRead: 15,
    },
    {
      id: "7",
      title: "Mediterranean Diet: A Lifestyle Approach to Healthy Eating",
      slug: "mediterranean-diet-lifestyle",
      excerpt:
        "Explore the principles of the Mediterranean diet and how this eating pattern promotes longevity, heart health, and overall wellbeing.",
      content: "Full content here...",
      image: {
        src: "/images/blog/mediterranean-diet-lifestyle.jpg?height=400&width=600",
        alt: "Traditional Mediterranean meal with olive oil, vegetables, and fish",
      },
      date: "17th November 2023",
      author: {
        id: "4",
        name: "Dr. Elena Martinez",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "2",
        name: "Nutrition Science",
        slug: "nutrition-science",
      },
      tags: [
        { id: "9", name: "Healthy", slug: "healthy" },
        { id: "15", name: "Mediterranean", slug: "mediterranean" },
        { id: "16", name: "Lifestyle", slug: "lifestyle" },
      ],
      minutesToRead: 11,
    },
    {
      id: "8",
      title: "Urban Gardening: Growing Food in Small Spaces",
      slug: "urban-gardening-small-spaces",
      excerpt:
        "Learn how to grow your own fresh produce even in limited urban spaces with these creative gardening solutions and tips.",
      content: "Full content here...",
      image: {
        src: "/images/blog/urban-gardening-small-spaces.jpg?height=400&width=600",
        alt: "Urban balcony garden with vegetables growing in containers",
      },
      date: "8th December 2023",
      author: {
        id: "5",
        name: "Leila Washington",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "3",
        name: "Sustainable Living",
        slug: "sustainable-living",
      },
      tags: [
        { id: "7", name: "Garden", slug: "garden" },
        { id: "8", name: "Grow", slug: "grow" },
        { id: "17", name: "Urban", slug: "urban" },
      ],
      minutesToRead: 9,
    },
    {
      id: "9",
      title: "Fermentation Basics: Preserving Food the Traditional Way",
      slug: "fermentation-basics-preserving",
      excerpt:
        "Discover the ancient art of fermentation and how it can enhance both the flavor and nutritional value of your food while extending shelf life.",
      content: "Full content here...",
      image: {
        src: "/images/blog/fermentation-basics-preserving.jpg?height=400&width=600",
        alt: "Jars of colorful fermented vegetables on wooden table",
      },
      date: "22nd December 2023",
      author: {
        id: "3",
        name: "Thomas Baker",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "3",
        name: "Sustainable Living",
        slug: "sustainable-living",
      },
      tags: [
        { id: "18", name: "Fermentation", slug: "fermentation" },
        { id: "19", name: "Preservation", slug: "preservation" },
        { id: "12", name: "Homemade", slug: "homemade" },
      ],
      minutesToRead: 14,
    },
    {
      id: "10",
      title: "Plant-Based Protein: Complete Guide to Meeting Your Needs",
      slug: "plant-based-protein-guide",
      excerpt:
        "Learn how to meet your protein requirements on a plant-based diet with this comprehensive guide to vegetable protein sources and combinations.",
      content: "Full content here...",
      image: {
        src: "/images/blog/plant-based-protein-guide.jpg?height=400&width=600",
        alt: "Assortment of plant-based protein sources including legumes, tofu, and quinoa",
      },
      date: "5th January 2024",
      author: {
        id: "4",
        name: "Dr. Elena Martinez",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "2",
        name: "Nutrition Science",
        slug: "nutrition-science",
      },
      tags: [
        { id: "1", name: "Vegan", slug: "vegan" },
        { id: "16", name: "Plant based", slug: "plant-based" },
        { id: "21", name: "Protein", slug: "protein" },
      ],
      minutesToRead: 13,
    },
    {
      id: "11",
      title: "Mindful Eating: Transforming Your Relationship with Food",
      slug: "mindful-eating-relationship-food",
      excerpt:
        "Explore how practicing mindfulness during meals can improve digestion, reduce overeating, and help you rediscover the pleasure of eating.",
      content: "Full content here...",
      image: {
        src: "/images/blog/mindful-eating-relationship-food.jpg?height=400&width=600",
        alt: "Person mindfully enjoying a nutritious meal outdoors",
      },
      date: "19th January 2024",
      author: {
        id: "6",
        name: "Maya Chen",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "4",
        name: "Mindful Living",
        slug: "mindful-living",
      },
      tags: [
        { id: "9", name: "Healthy", slug: "healthy" },
        { id: "22", name: "Mindfulness", slug: "mindfulness" },
        { id: "23", name: "Wellness", slug: "wellness" },
      ],
      minutesToRead: 10,
    },
    {
      id: "12",
      title: "Spice Cabinet Essentials: Building Flavors from Around the World",
      slug: "spice-cabinet-essentials",
      excerpt:
        "Learn how to stock and use a versatile spice collection that allows you to create authentic flavors from global cuisines without overwhelming your pantry.",
      content: "Full content here...",
      image: {
        src: "/images/blog/spice-cabinet-essentials.jpg?height=400&width=600",
        alt: "Colorful array of spices in small bowls on dark background",
      },
      date: "2nd February 2024",
      author: {
        id: "7",
        name: "Raj Patel",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "1",
        name: "Recipe Ideas",
        slug: "recipe-ideas",
      },
      tags: [
        { id: "24", name: "Spices", slug: "spices" },
        { id: "25", name: "Global Cuisine", slug: "global-cuisine" },
        { id: "26", name: "Flavor", slug: "flavor" },
      ],
      minutesToRead: 11,
    },
    {
      id: "13",
      title: "Meal Prep Mastery: Efficient Cooking for Busy Weeks",
      slug: "meal-prep-mastery",
      excerpt:
        "Discover time-saving meal preparation strategies that help you eat well throughout the week while minimizing daily cooking time.",
      content: "Full content here...",
      image: {
        src: "/images/blog/meal-prep-mastery.jpg?height=400&width=600",
        alt: "Organized meal prep containers with various healthy prepared foods",
      },
      date: "15th February 2024",
      author: {
        id: "2",
        name: "Sarah Johnson",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "5",
        name: "Kitchen Efficiency",
        slug: "kitchen-efficiency",
      },
      tags: [
        { id: "27", name: "Meal Prep", slug: "meal-prep" },
        { id: "28", name: "Time Saving", slug: "time-saving" },
        { id: "9", name: "Healthy", slug: "healthy" },
      ],
      minutesToRead: 12,
    },
    {
      id: "14",
      title: "Cooking Methods Explained: From Braising to Sous Vide",
      slug: "cooking-methods-explained",
      excerpt:
        "Master the fundamental cooking techniques that form the foundation of culinary arts, with detailed explanations and practical applications.",
      content: "Full content here...",
      image: {
        src: "/images/blog/cooking-methods-explained.jpg?height=400&width=600",
        alt: "Chef demonstrating various cooking techniques in professional kitchen",
      },
      date: "1st March 2024",
      author: {
        id: "8",
        name: "Chef James Wilson",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "6",
        name: "Cooking Techniques",
        slug: "cooking-techniques",
      },
      tags: [
        { id: "29", name: "Cooking Methods", slug: "cooking-methods" },
        { id: "30", name: "Culinary Skills", slug: "culinary-skills" },
        { id: "4", name: "Cooking", slug: "cooking" },
      ],
      minutesToRead: 15,
    },
    {
      id: "15",
      title: "Edible Flowers: Adding Beauty and Flavor to Your Meals",
      slug: "edible-flowers-meals",
      excerpt:
        "Discover the world of edible flowers and how they can enhance both the visual appeal and flavor profile of your culinary creations.",
      content: "Full content here...",
      image: {
        src: "/images/blog/edible-flowers-meals.jpg?height=400&width=600",
        alt: "Salad garnished with colorful edible flowers on white plate",
      },
      date: "18th March 2024",
      author: {
        id: "5",
        name: "Leila Washington",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "7",
        name: "Ingredient Spotlight",
        slug: "ingredient-spotlight",
      },
      tags: [
        { id: "31", name: "Edible Flowers", slug: "edible-flowers" },
        { id: "32", name: "Garnishing", slug: "garnishing" },
        { id: "7", name: "Garden", slug: "garden" },
      ],
      minutesToRead: 8,
    },
    {
      id: "16",
      title: "Knife Skills: The Foundation of Efficient Cooking",
      slug: "knife-skills-foundation",
      excerpt:
        "Learn the fundamental knife techniques that professional chefs master, improving your speed, safety, and precision in the kitchen.",
      content: "Full content here...",
      image: {
        src: "/images/blog/knife-skills-foundation.jpg?height=400&width=600",
        alt: "Chef demonstrating proper knife technique on cutting board",
      },
      date: "5th April 2024",
      author: {
        id: "8",
        name: "Chef James Wilson",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "6",
        name: "Cooking Techniques",
        slug: "cooking-techniques",
      },
      tags: [
        { id: "33", name: "Knife Skills", slug: "knife-skills" },
        { id: "30", name: "Culinary Skills", slug: "culinary-skills" },
        { id: "34", name: "Kitchen Tools", slug: "kitchen-tools" },
      ],
      minutesToRead: 13,
    },
    {
      id: "17",
      title: "Cooking with Children: Age-Appropriate Kitchen Activities",
      slug: "cooking-with-children-activities",
      excerpt:
        "Discover how to involve children of different ages in cooking, with safe, educational, and fun activities that build skills and confidence.",
      content: "Full content here...",
      image: {
        src: "/images/blog/cooking-with-children-activities.jpg?height=400&width=600",
        alt: "Parent and child baking cookies together in home kitchen",
      },
      date: "20th April 2024",
      author: {
        id: "9",
        name: "Emily Rodriguez",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "8",
        name: "Family Cooking",
        slug: "family-cooking",
      },
      tags: [
        { id: "3", name: "Children", slug: "children" },
        { id: "4", name: "Cooking", slug: "cooking" },
        { id: "5", name: "Family", slug: "family" },
      ],
      minutesToRead: 10,
    },
    {
      id: "18",
      title: "Understanding Umami: The Fifth Taste in Your Kitchen",
      slug: "understanding-umami",
      excerpt:
        "Explore the science of umami, the fifth basic taste, and learn how to harness its flavor-enhancing properties in everyday cooking.",
      content: "Full content here...",
      image: {
        src: "/images/blog/understanding-umami.jpg?height=400&width=600",
        alt: "Umami-rich ingredients including mushrooms, tomatoes, and parmesan cheese",
      },
      date: "8th May 2024",
      author: {
        id: "7",
        name: "Raj Patel",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "9",
        name: "Food Science",
        slug: "food-science",
      },
      tags: [
        { id: "26", name: "Flavor", slug: "flavor" },
        { id: "35", name: "Umami", slug: "umami" },
        { id: "36", name: "Food Science", slug: "food-science" },
      ],
      minutesToRead: 11,
    },
    {
      id: "19",
      title: "Zero-Waste Cooking: Making the Most of Every Ingredient",
      slug: "zero-waste-cooking",
      excerpt:
        "Learn practical strategies for reducing food waste in your kitchen while saving money and creating delicious meals from ingredients often discarded.",
      content: "Full content here...",
      image: {
        src: "/images/blog/zero-waste-cooking.jpg?height=400&width=600",
        alt: "Chef preparing meal using vegetable scraps and whole ingredients",
      },
      date: "22nd May 2024",
      author: {
        id: "5",
        name: "Leila Washington",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "3",
        name: "Sustainable Living",
        slug: "sustainable-living",
      },
      tags: [
        { id: "37", name: "Zero Waste", slug: "zero-waste" },
        { id: "38", name: "Sustainability", slug: "sustainability" },
        { id: "39", name: "Food Waste", slug: "food-waste" },
      ],
      minutesToRead: 14,
    },
    {
      id: "20",
      title: "Global Breakfast Traditions: Morning Meals Around the World",
      slug: "global-breakfast-traditions",
      excerpt:
        "Take a culinary journey through diverse breakfast traditions from around the world, with recipes and cultural context for each morning meal.",
      content: "Full content here...",
      image: {
        src: "/images/blog/global-breakfast-traditions.jpg?height=400&width=600",
        alt: "Collage of diverse breakfast dishes from around the world",
      },
      date: "6th June 2024",
      author: {
        id: "10",
        name: "Marco Oliveira",
        avatar: "/images/blog/avatar.jpg?height=32&width=32",
      },
      category: {
        id: "10",
        name: "Global Cuisine",
        slug: "global-cuisine",
      },
      tags: [
        { id: "40", name: "Breakfast", slug: "breakfast" },
        { id: "25", name: "Global Cuisine", slug: "global-cuisine" },
        { id: "41", name: "Cultural Food", slug: "cultural-food" },
      ],
      minutesToRead: 12,
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
  return posts.slice(0, 5);
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
