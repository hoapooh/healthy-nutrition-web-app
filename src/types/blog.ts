export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  image?: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogParams {
  pageIndex?: number;
  limit?: number;
  title?: string;
  status?: "draft" | "published" | "archived";
  author?: string;
  tags?: string[];
}

export interface BlogResponse {
  result: {
    items: Blog[];
    totalCount: number;
    pageIndex: number;
    limit: number;
  };
}

export interface CreateBlogBody {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  status: "draft" | "published";
  image?: string;
}

export interface UpdateBlogBody {
  id: string;
  body: {
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    status: "draft" | "published";
    image?: string;
  };
}

export interface DeleteBlogParams {
  id: string;
}

// Blog status options for forms
export const BLOG_STATUSES = [
  { value: "draft", label: "Bản nháp" },
  { value: "published", label: "Đã xuất bản" },
  { value: "archived", label: "Đã lưu trữ" },
] as const;
