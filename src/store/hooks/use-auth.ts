import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCredentials, clearCredentials } from "../slices/auth-slice";
import { useGetCurrentUserQuery } from "@/services/auth-services";
import { getAuthStatus } from "@/lib/auth-utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const {
    token,
    isAuthenticated,
    user: storeUser,
  } = useAppSelector((state) => state.auth); // Only call the API if we have a token and don't have complete user data
  const shouldSkipQuery = !token;

  // TODO: this should be check after the api getCurrentUser response with id ? Maybe
  // const shouldSkipQuery = !token || (!!storeUser?.id && storeUser.id !== "");
  const {
    data: user,
    isLoading,
    error,
  } = useGetCurrentUserQuery(undefined, {
    skip: shouldSkipQuery,
  });

  useEffect(() => {
    // If we successfully get user data, update the auth state with complete user info
    if (user && token) {
      dispatch(
        setCredentials({
          user: user.result,
          token: token,
        }),
      );
    }
  }, [user, dispatch, token]);

  useEffect(() => {
    // Handle 401 errors by clearing auth state
    if (error && "status" in error && error.status === 401) {
      dispatch(clearCredentials());
    }
  }, [error, dispatch]);
  return {
    isLoading: isLoading && !!token,
    // TODO: check thử xem có id hay không , nếu ko thì nên nhờ Backend trả về data thêm
    // isAuthenticated: isAuthenticated && !!storeUser?.id,
    isAuthenticated: isAuthenticated,
    user: storeUser,
    error,
    authStatus: getAuthStatus(
      isLoading && !!token,
      // TODO: check thử xem có id hay không , nếu ko thì nên nhờ Backend trả về data thêm
      // isAuthenticated && !!storeUser?.id,
      isAuthenticated,
      error,
    ),
  };
};
