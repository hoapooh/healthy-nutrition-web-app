import { apiSlice } from "@/store/slices/api-slice";
import {
  BlogParams,
  BlogResponse,
  CreateBlogBody,
  UpdateBlogBody,
  DeleteBlogParams,
  Blog,
} from "@/types/blog";

// Fake blog data for demo purposes
const fakeBlog: Blog = {
  id: "1",
  title: "The Ultimate Guide to Healthy Nutrition",
  content: `<h2>Introduction to Healthy Nutrition</h2>
  <p>In today's fast-paced world, maintaining a healthy diet can be challenging. This comprehensive guide will help you understand the fundamentals of nutrition and how to make better food choices for your overall well-being.</p>
  
  <h3>Key Principles of Healthy Eating</h3>
  <p>Healthy eating is not about strict limitations, staying unrealistically thin, or depriving yourself of the foods you love. Rather, it's about feeling great, having more energy, improving your health, and boosting your mood.</p>
  
  <ul>
    <li><strong>Balance:</strong> Include a variety of foods from all food groups</li>
    <li><strong>Moderation:</strong> Control portion sizes and frequency of indulgent foods</li>
    <li><strong>Variety:</strong> Try different foods to ensure you get all nutrients</li>
    <li><strong>Quality:</strong> Choose whole, unprocessed foods when possible</li>
  </ul>
  
  <h3>Essential Nutrients Your Body Needs</h3>
  <p>Understanding macronutrients and micronutrients is crucial for maintaining optimal health:</p>
  
  <blockquote>
    <p>"Let food be thy medicine and medicine be thy food." - Hippocrates</p>
  </blockquote>
  
  <h4>Macronutrients:</h4>
  <ol>
    <li><strong>Carbohydrates:</strong> Your body's primary energy source</li>
    <li><strong>Proteins:</strong> Essential for muscle building and repair</li>
    <li><strong>Fats:</strong> Important for hormone production and nutrient absorption</li>
  </ol>
  
  <h4>Micronutrients:</h4>
  <p>Vitamins and minerals that support various bodily functions and prevent diseases.</p>
  
  <h3>Practical Tips for Healthy Living</h3>
  <p>Here are some actionable tips to help you maintain a healthy lifestyle:</p>
  
  <ul>
    <li>Stay hydrated by drinking plenty of water throughout the day</li>
    <li>Plan your meals in advance to avoid unhealthy choices</li>
    <li>Read nutrition labels to make informed decisions</li>
    <li>Cook more meals at home to control ingredients</li>
    <li>Practice mindful eating and listen to your body's hunger cues</li>
  </ul>
  
  <p>Remember, small changes in your daily habits can lead to significant improvements in your overall health and well-being. Start with one or two changes and gradually build upon them.</p>`,
  excerpt:
    "Discover the essential principles of healthy nutrition and learn how to make better food choices for optimal health and well-being.",
  author: "Admin User",
  image: "/healthy-product.png",
  status: "published",
  tags: ["nutrition", "health", "wellness", "diet", "lifestyle"],
  createdAt: "2024-12-01T10:00:00Z",
  updatedAt: "2024-12-05T15:30:00Z",
  publishedAt: "2024-12-02T09:00:00Z",
};

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<BlogResponse, BlogParams>({
      queryFn: async (params) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Return fake data
        return {
          data: {
            result: {
              items: [fakeBlog],
              totalCount: 1,
              pageIndex: params.pageIndex || 1,
              limit: params.limit || 10,
            },
          },
        };
      },
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query<Blog, string>({
      queryFn: async (id) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (id === "1") {
          return { data: fakeBlog };
        }

        return {
          error: {
            status: 404,
            data: { message: "Blog not found" },
          },
        };
      },
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),
    createBlog: builder.mutation<void, CreateBlogBody>({
      queryFn: async (body) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulate successful creation
        console.log("Creating blog with data:", body);
        return { data: undefined };
      },
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<{ message: string }, UpdateBlogBody>({
      queryFn: async ({ id, body }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Simulate successful update
        console.log("Updating blog with id:", id, "and data:", body);
        return { data: { message: "Blog updated successfully" } };
      },
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation<void, DeleteBlogParams>({
      queryFn: async ({ id }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulate successful deletion
        console.log("Deleting blog with id:", id);
        return { data: undefined };
      },
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
