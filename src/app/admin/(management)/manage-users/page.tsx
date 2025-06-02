import React from "react";
import ManageUsersPageContent from "@/features/admin/manage-users/ui/manage-users-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users",
  description: "Manage your users effectively and efficiently.",
};

const ManageUsersPage = () => {
  return <ManageUsersPageContent />;
};

export default ManageUsersPage;
