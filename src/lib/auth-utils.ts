/**
 * Authentication utilities for managing tokens and user sessions
 */

const TOKEN_KEY = "healthy-nutrition-token";

export class AuthUtils {
  /**
   * Get token from localStorage
   */
  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Set token in localStorage
   */
  static setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Remove token from localStorage
   */
  static removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Check if user has a valid token
   */
  static hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Clear all auth data
   */
  static clearAuthData(): void {
    this.removeToken();
    // Clear any other auth-related data if needed
  }
}

/**
 * Auth status enum for better type safety
 */
export enum AuthStatus {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  ERROR = "error",
}

/**
 * Get current auth status based on auth state
 */
export function getAuthStatus(
  isLoading: boolean,
  isAuthenticated: boolean,
  error: unknown,
): AuthStatus {
  if (isLoading) return AuthStatus.LOADING;
  if (error) return AuthStatus.ERROR;
  if (isAuthenticated) return AuthStatus.AUTHENTICATED;
  return AuthStatus.UNAUTHENTICATED;
}
