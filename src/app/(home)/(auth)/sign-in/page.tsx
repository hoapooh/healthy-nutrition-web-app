import SignInForm from "@/features/client/auth/ui/components/sign-in-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản của bạn",
};

const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
