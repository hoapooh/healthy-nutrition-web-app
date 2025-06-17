"use client";

import BlogSearch from "./blog-search";
import BlogRecentPosts from "./blog-recent-posts";
import BlogPopularTags from "./blog-popular-tags";
import { useState, useEffect } from "react";
import {
  getRecentPosts,
  getPopularTags,
} from "@/features/client/home/data/blog-data";
import type { BlogPost, Tag } from "@/features/client/home/data/types";

const BlogSidebar = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [popularTags, setPopularTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      const posts = await getRecentPosts();
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
