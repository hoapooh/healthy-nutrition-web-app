"use client";

import BlogSearch from "./blog-search";
import BlogRecentPosts from "./blog-recent-posts";
import BlogPopularTags from "./blog-popular-tags";
import { useState, useEffect } from "react";
import {
  getBlogPosts,
  getPopularTags,
} from "@/features/client/blog/services/blog-api";
import type { BlogPost } from "@/features/client/home/data/types";

const BlogSidebar = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  useEffect(() => {
    const fetchSidebarData = async () => {
      const posts = await getBlogPosts({ limit: 5 }); // Get recent posts
      const tags = await getPopularTags();

      setRecentPosts(posts);
      setPopularTags(tags);
    };

    fetchSidebarData();
  }, []);

  return (
    <div className="space-y-8">
      <BlogSearch />
      <BlogRecentPosts posts={recentPosts} />
      <BlogPopularTags tags={popularTags} />
    </div>
  );
};

export default BlogSidebar;
