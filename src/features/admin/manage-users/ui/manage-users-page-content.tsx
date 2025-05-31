"use client";

import React from "react";
import { useGetAllAccountsQuery } from "@/services/user-services";
import { GetAllUsersParams } from "@/types/auth";
import { UsersDataTable } from "./components/users-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ManageUsersPageContent() {
  const [filters, setFilters] = React.useState<GetAllUsersParams>({
    pageIndex: 1,
    limit: 10,
  });

  const {
    data: usersResponse,
    isLoading,
    refetch,
  } = useGetAllAccountsQuery(filters);

  const users = usersResponse?.result?.items || [];
  const totalCount = usersResponse?.result?.totalCount || 0;

  const handleFiltersChange = (newFilters: GetAllUsersParams) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-primary text-3xl font-bold tracking-tight">
            Users Management
          </h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions here.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>
            View, create, edit, and manage user accounts. Total:{" "}
            {totalCount} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersDataTable
            data={users}
            totalCount={totalCount}
            isLoading={isLoading}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>
    </div>
  );
}
