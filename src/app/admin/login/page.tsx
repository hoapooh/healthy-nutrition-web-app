import AdminLoginForm from "@/features/admin/login/ui/components/admin-login-form";
import AdminLoginLayout from "@/features/admin/login/ui/layouts/admin-login-layout";
import ProtectedAuthRoute from "@/features/shared/ui/components/protected/protected-auth-route";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Log in to your admin account",
};

const LoginPage = () => {
  return (
    <ProtectedAuthRoute redirectTo="/admin/dashboard">
      <AdminLoginLayout>
        <AdminLoginForm />
      </AdminLoginLayout>
    </ProtectedAuthRoute>
  );
};

export default LoginPage;
