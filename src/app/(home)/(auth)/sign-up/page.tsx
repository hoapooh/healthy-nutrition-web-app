import { SignUpForm } from "@/features/client/auth/ui/components/sign-up-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

const SignUpPage = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
