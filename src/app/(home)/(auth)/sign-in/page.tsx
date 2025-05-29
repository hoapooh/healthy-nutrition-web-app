import SignInForm from "@/features/client/auth/ui/components/sign-in-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
