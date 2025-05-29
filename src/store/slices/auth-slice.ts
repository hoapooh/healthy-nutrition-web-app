import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload, AuthState, User } from "@/types/auth";
import { AuthUtils } from "@/lib/auth-utils";

// Initial state
const getInitialToken = () => {
  return AuthUtils.getToken();
};

const initialState: AuthState = {
  user: null,
  token: getInitialToken(),
  isAuthenticated: false,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      // Only set isAuthenticated to true if we have complete user data
      state.isAuthenticated = true;
      AuthUtils.setToken(token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      AuthUtils.clearAuthData();
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      AuthUtils.clearAuthData();
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Export actions and reducer
export const { setCredentials, logout, clearCredentials, updateUser } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
