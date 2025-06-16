// Types
export interface User {
  id?: string;
  email?: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  image?: string;
  role?: "User" | "Admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Requests
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  image?: string;
}

// Responses
// TODO: Chỉnh lại vị trí accessToken ngoài cùng
export interface AuthResponse {
  message: string;
  accessToken: {
    accessToken: string;
    id: string;
    fullName: string;
    role: "User" | "Admin";
    image?: string;
  };
}

export interface RegisterResponse {
  message: string;
}

export interface CurrentUserResponse {
  message: string;
  result: User;
}

// Payloads
export interface AuthPayload {
  user: User | null;
  token: string;
}

// Get
export interface GetAllUsersResponse {
  message: string;
  result: {
    items: User[];
    totalCount: number;
  };
}

export interface GetAllUsersParams {
  pageIndex?: number;
  limit?: number;
}

// Create
export interface CreateUserBody {
  email: string;
  fullName: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface CreateUserResponse {
  message: string;
}

// Update
export interface UpdateUserResponse {
  message: string;
}

export interface UpdateUserParams {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
}

export interface UpdateUserBody {
  image?: File | null;
}

export interface UpdateUserRequest {
  params: UpdateUserParams;
  body: UpdateUserBody;
}
