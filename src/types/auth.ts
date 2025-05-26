// Types
export interface User {
  id: string;
  email?: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  image?: string;
  role?: "User" | "Admin";
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

export interface CurrentUserResponse {
  message: string;
  result: User;
}

// Payloads
export interface AuthPayload {
  user: User;
  token: string;
}
