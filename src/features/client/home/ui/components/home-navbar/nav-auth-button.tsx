"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/slices/auth-slice";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const NavAuthButton = () => {
  const dispatch = useAppDispatch();

  // Selectors to get current user and authentication status
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Handler for logout action
  const handleLogout = () => {
    dispatch(logout());
    // Optionally, you can redirect to the home page or show a toast notification
    toast.success("Bye bye! 👋");
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      {isAuthenticated ? (
        <>
          <p className="shrink-0">
            Hello, {currentUser?.email || currentUser?.fullName}
          </p>
          <Button
            className="rounded-sm bg-green-600 hover:cursor-pointer hover:bg-green-600/80"
            size={"sm"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            variant={"outline"}
            className="rounded-sm"
            size={"sm"}
          >
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button
            className="rounded-sm bg-green-600 hover:cursor-pointer hover:bg-green-600/80"
            size={"sm"}
          >
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default NavAuthButton;
