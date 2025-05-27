import { SignUpForm } from "@/features/client/auth/ui/components/sign-up-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
