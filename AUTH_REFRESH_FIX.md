# Authentication Refresh Issue Fix

## Problem

When users refreshed the page after login, they would see an unauthenticated status even though they had a valid token in localStorage.

## Root Cause

1. **Initial State Issue**: The `AuthProvider` was setting a dummy user object with empty values (`id: ""`) while keeping `isAuthenticated: false`
2. **Authentication Logic**: The `useAuth` hook required both `isAuthenticated: true` AND a user with a non-empty `id`
3. **State Mismatch**: After refresh, the token existed but `isAuthenticated` was false, causing authentication to fail

## Solution

1. **Updated AuthProvider**: Now sets `user: null` initially instead of dummy user data
2. **Modified setCredentials**: Only sets `isAuthenticated: true` when we have complete user data with an `id`
3. **Updated AuthPayload**: Allows `user` to be `null` during token initialization
4. **Simplified Authentication Check**: Removed redundant empty string check in `useAuth`

## Flow After Fix

1. Page refresh → `AuthProvider` detects token in localStorage
2. Sets token in Redux store with `user: null` and `isAuthenticated: false`
3. `useAuth` hook sees token but no user data → makes API call to fetch user
4. API returns user data → `setCredentials` called with complete user → `isAuthenticated: true`
5. User is now properly authenticated

## Files Modified

- `src/store/auth-provider.tsx`
- `src/store/slices/auth-slice.ts`
- `src/store/hooks/use-auth.ts`
- `src/types/auth.ts`
