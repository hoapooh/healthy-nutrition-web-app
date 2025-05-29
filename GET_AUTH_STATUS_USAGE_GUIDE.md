# Practical Usage Guide for `getAuthStatus` Function

The `getAuthStatus` function provides a consistent, type-safe way to handle authentication states throughout your application. Here are the main places where you can and should use it:

## 🎯 **Where to Use `getAuthStatus`**

### 1. **Enhanced useAuth Hook** ✅

- **File**: `src/store/hooks/use-auth.ts`
- **Purpose**: Provides enum-based status alongside boolean flags
- **Usage**:

```typescript
const { authStatus, isAuthenticated, user } = useAuth();
// authStatus is now an enum: LOADING | AUTHENTICATED | UNAUTHENTICATED | ERROR
```

### 2. **UI Components with Auth-Dependent Rendering**

- **File**: `src/features/shared/ui/components/auth-status-indicator.tsx`
- **Purpose**: Visual status indicators in headers/nav bars
- **Usage**:

```tsx
<AuthStatusIndicator /> // Shows "Loading...", "Signed in as John", etc.
```

### 3. **Navigation Headers**

- **File**: `src/features/shared/ui/components/header-auth-section.tsx`
- **Purpose**: Show different navigation elements based on auth state
- **Usage**:

```tsx
<HeaderAuthSection /> // Shows avatar menu, sign-in buttons, or loading state
```

### 4. **Page Layouts with Auth Requirements**

- **File**: `src/features/shared/ui/components/auth-aware-layout.tsx`
- **Purpose**: Wrap pages that need auth handling
- **Usage**:

```tsx
<AuthAwareLayout requireAuth={true} allowedRoles={["Admin"]}>
  <AdminDashboard />
</AuthAwareLayout>
```

### 5. **Form Submissions**

- **File**: `src/features/shared/hooks/use-auth-aware-submission.ts`
- **Purpose**: Handle form submissions with auth validation
- **Usage**:

```tsx
const { submitWithAuth, canSubmit, authStatus } = useAuthAwareSubmission();
```

### 6. **API Request Interceptors**

```typescript
// In your API middleware or interceptors
const authStatus = getAuthStatus(isLoading, isAuthenticated, error);
if (authStatus === AuthStatus.UNAUTHENTICATED) {
  // Redirect to login or show auth modal
}
```

### 7. **Route Guards**

```typescript
// In route protection middleware
const authStatus = getAuthStatus(isLoading, isAuthenticated, error);
switch (authStatus) {
  case AuthStatus.LOADING:
    return <LoadingPage />;
  case AuthStatus.UNAUTHENTICATED:
    return <SignInPage />;
  // etc...
}
```

### 8. **Conditional Feature Access**

```typescript
// In feature components
const { authStatus } = useAuth();
const canAccessPremiumFeatures =
  authStatus === AuthStatus.AUTHENTICATED && user?.role === "Premium";
```

## 🚀 **Benefits of Using `getAuthStatus`**

### **1. Type Safety**

```typescript
// Instead of multiple boolean checks:
if (isLoading) {
  /* ... */
} else if (error) {
  /* ... */
} else if (isAuthenticated) {
  /* ... */
} else {
  /* ... */
}

// Use clean switch statements:
switch (authStatus) {
  case AuthStatus.LOADING: /* ... */
  case AuthStatus.ERROR: /* ... */
  case AuthStatus.AUTHENTICATED: /* ... */
  case AuthStatus.UNAUTHENTICATED: /* ... */
}
```

### **2. Consistent State Management**

- All auth-related components use the same status logic
- Reduces bugs from inconsistent state checking
- Makes debugging easier

### **3. Better Developer Experience**

- IDE autocomplete for auth states
- Compile-time error checking
- Clear intention in code

### **4. Maintainability**

- Single source of truth for auth status logic
- Easy to add new states if needed
- Centralized business logic

## 📝 **Real-World Usage Patterns**

### **Pattern 1: Component Rendering**

```tsx
export function FeatureComponent() {
  const { authStatus, user } = useAuth();

  return (
    <div>
      {authStatus === AuthStatus.LOADING && <Spinner />}
      {authStatus === AuthStatus.AUTHENTICATED && (
        <WelcomeMessage user={user} />
      )}
      {authStatus === AuthStatus.UNAUTHENTICATED && <SignInPrompt />}
      {authStatus === AuthStatus.ERROR && <ErrorMessage />}
    </div>
  );
}
```

### **Pattern 2: Form Validation**

```tsx
export function ContactForm() {
  const { authStatus } = useAuth();

  const canSubmit = authStatus === AuthStatus.AUTHENTICATED;
  const isLoading = authStatus === AuthStatus.LOADING;

  return (
    <form>
      <input disabled={isLoading} />
      <button disabled={!canSubmit || isLoading}>
        {authStatus === AuthStatus.LOADING ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
```

### **Pattern 3: Navigation Logic**

```tsx
export function Navigation() {
  const { authStatus, user } = useAuth();

  const navigationItems = useMemo(() => {
    switch (authStatus) {
      case AuthStatus.AUTHENTICATED:
        return user?.role === "Admin" ? adminNavItems : userNavItems;
      case AuthStatus.UNAUTHENTICATED:
        return publicNavItems;
      default:
        return [];
    }
  }, [authStatus, user?.role]);

  return <nav>{/* render navigationItems */}</nav>;
}
```

## 🔧 **Implementation Tips**

1. **Always handle all states**: Use exhaustive switch statements
2. **Provide loading states**: Users should know something is happening
3. **Show helpful error messages**: Guide users on how to fix auth issues
4. **Use with existing hooks**: Combine with `useAuth` for full functionality
5. **Consider accessibility**: Ensure screen readers can understand auth states

## 🎨 **UI/UX Best Practices**

- **Loading**: Show skeleton UI or spinners
- **Authenticated**: Show user info and relevant actions
- **Unauthenticated**: Provide clear sign-in/sign-up options
- **Error**: Show retry options and helpful error messages

The `getAuthStatus` function transforms scattered boolean logic into clean, predictable patterns that make your auth handling robust and maintainable!
