"use client";

import React from "react";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInformation from "@/features/client/profile/ui/components/personal-information";
import ChangePassword from "@/features/client/profile/ui/components/change-password";
import { User, Key } from "lucide-react";

const ProfilePage = () => {
  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["User"]}>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          {" "}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cài đặt hồ sơ
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý cài đặt tài khoản và tùy chọn của bạn
          </p>
        </div>

        {/* Tabs Layout */}
        <Tabs defaultValue="personal" className="space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left Sidebar - Tab Navigation */}
            <div className="lg:w-1/4">
              <TabsList className="bg-muted/50 flex h-auto w-full flex-col p-1">
                <TabsTrigger
                  value="personal"
                  className="w-full justify-start space-x-2 p-2 text-left"
                >
                  <User className="h-4 w-4" />
                  <span>Personal Information</span>
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="w-full justify-start space-x-2 p-2 text-left"
                >
                  <Key className="h-4 w-4" />
                  <span>Change Password</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Right Content Area */}
            <div className="lg:w-3/4">
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="mt-0">
                <PersonalInformation />
              </TabsContent>

              {/* Change Password Tab */}
              <TabsContent value="password" className="mt-0">
                <ChangePassword />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
