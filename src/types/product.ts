// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryIds: string[];
  tags: string[];
  nutritionFact: {
    calories: number;
    protein: number;
    cholesterol: number;
    lipid: number;
    sugar: number;
    carbs: number;
  };
}

// GET
export interface GetProductsResponse {
  message: string;
  result: {
    items: Product[];
    totalCount: number;
  };
}

export interface GetProductsParams {
  searchTerm?: string;
  categoryIds?: string[];
  brand?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  minStockQuantity?: number;
  maxStockQuantity?: number;
  pageIndex?: number;
  limit?: number;
}

export interface GetProductByIdResponse {
  message: string;
  product: Product;
}

export interface GetProductByIdParams {
  id: string;
}

// POST
export interface CreateProductResponse {
  message: string;
}

export interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  categoryIds: string[];
  tags: string[];
  brand: string;
  stockQuantity: number;
  "nutritionFact.calories": number;
  "nutritionFact.protein": number;
  "nutritionFact.cholesterol": number;
  "nutritionFact.lipid": number;
  "nutritionFact.sugar": number;
  "nutritionFact.carbs": number;
  // TODO: fix this later
  /* nutritionFact: {
    calories: number;
    protein: number;
    cholesterol: number;
    lipid: number;
    sugar: number;
    carbs: number;
  }; */
}

export interface CreateProductBody {
  imageProduct: File[];
}

export interface CreateProductRequest {
  params: CreateProductParams;
  body: CreateProductBody;
}

// PUT
export interface UpdateProductResponse {
  message: string;
}

export interface UpdateProductParams {
  name: string;
  description: string;
  price: number;
  categoryIds: string[];
  tags: string[];
  brand: string;
  stockQuantity: number;
  "nutritionFact.calories": number;
  "nutritionFact.protein": number;
  "nutritionFact.cholesterol": number;
  "nutritionFact.lipid": number;
  "nutritionFact.sugar": number;
  "nutritionFact.carbs": number;
}

export interface UpdateProductBody {
  imageProduct?: File[];
}

export interface UpdateProductRequest {
  id: string;
  params: UpdateProductParams;
  body?: UpdateProductBody;
}

// DELETE
export interface DeleteProductResponse {
  message: string;
  success: boolean;
}

export interface DeleteProductParams {
  id: string;
}
