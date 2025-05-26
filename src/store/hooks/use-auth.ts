import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../slices/auth-slice";
import { useGetCurrentUserQuery } from "@/services/auth-services";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    // If we have a user, update the auth state
    if (user) {
      dispatch(
        setCredentials({
          user: user.result,
          token: localStorage.getItem("healthy-nutrition-token") || "",
        }),
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
