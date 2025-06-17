export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogParams {
  pageIndex?: number;
  limit?: number;
  slug?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  searchTerm?: string;
  title?: string;
}

export interface BlogResponse {
  result: {
    items: Blog[];
    totalCount: number;
    pageIndex: number;
    limit: number;
  };
}

export interface BlogBySlugParams {
  slug: string;
}

// POST
export interface CreateBlogParams {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export interface CreateBlogBody {
  imageBlog: File;
}

export interface CreateBlogRequest {
  params: CreateBlogParams;
  body: CreateBlogBody;
}

// PUT
export interface UpdateBlogParams {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export interface UpdateBlogBody {
  imageBlog?: File | null;
}

export interface UpdateBlogRequest {
  id: string;
  params: UpdateBlogParams;
  body: UpdateBlogBody;
}

// DELETE
export interface DeleteBlogParams {
  id: string;
}
