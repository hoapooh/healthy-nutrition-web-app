import React from "react";

const ManageUsersPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-primary mb-6 text-3xl font-bold">Users</h1>
      <div className="grid gap-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Users Overview</h2>
          <p className="text-muted-foreground">
            This is the users page. You can manage users available in the
            system, view user history, and perform related operations here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
