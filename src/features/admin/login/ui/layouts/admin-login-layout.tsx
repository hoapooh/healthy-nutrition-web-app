import React from "react";

interface AdminLoginLayoutProps {
  children: React.ReactNode;
}

const AdminLoginLayout = ({ children }: AdminLoginLayoutProps) => {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      {children}
    </div>
  );
};

export default AdminLoginLayout;
