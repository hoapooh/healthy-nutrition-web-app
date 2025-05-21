import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../slices/authSlice";
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    // If we have a user, update the auth state
    if (user) {
      dispatch(
        setCredentials({ user, token: localStorage.getItem("token") || "" }),
      );
    }
  }, [user, dispatch]);

  return {
    isLoading,
    isAuthenticated: !!user,
    user,
    error,
  };
};
