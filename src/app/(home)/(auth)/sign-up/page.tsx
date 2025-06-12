import { SignUpForm } from "@/features/client/auth/ui/components/sign-up-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản mới",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
