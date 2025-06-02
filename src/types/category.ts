export interface Category {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface CategoryParams {
  name?: string;
  type?: string;
  description?: string;
  pageIndex?: number;
  limit?: number;
}

// GET
export interface CategoryResponse {
  message: string;
  result: {
    items: Category[];
    totalCount: number;
  };
}

// CREATE
export interface CreateCategoryBody {
  name: string;
  type: string;
  description: string;
}

// UPDATE
export interface UpdateCategoryBody {
  id: string;
  body: {
    name?: string;
    type?: string;
    description?: string;
  };
}

// DELETE
export interface DeleteCategoryParams {
  id: string;
}

export const CATEGORY_TYPES = [
  { label: "Product", value: "Product" },
  { label: "Goal", value: "Goal" },
];
