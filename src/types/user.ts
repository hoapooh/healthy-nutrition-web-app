export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "customer";
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
