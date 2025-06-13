"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import ProfileImageUploader from "./profile-image-uploader";
import EditableProfileFields from "./editable-profile-fields";
import useUpdateProfile from "../../hooks/use-update-profile";

const PersonalInformation = () => {
  const {
    user,
    form,
    onSubmit,
    isLoading,
    isEditMode,
    handleCancel,
    handleEdit,
  } = useUpdateProfile();
  if (!user) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Không có thông tin người dùng</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Chưa cung cấp";

    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Ngày không hợp lệ";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <ProfileImageUploader
              userFullName={user.fullName}
              className="flex-shrink-0"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                {user.role && (
                  <Badge
                    variant={user.role === "Admin" ? "destructive" : "healthy"}
                    className="flex items-center space-x-1"
                  >
                    <Shield className="h-3 w-3" />
                    <span>{user.role}</span>
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Thành viên từ {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Thông tin cá nhân</span>
              </CardTitle>
              <CardDescription>
                Thông tin cá nhân và chi tiết tài khoản của bạn
              </CardDescription>
            </div>
            {!isEditMode && (
              <EditableProfileFields
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
                isEditMode={isEditMode}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditMode ? (
            <EditableProfileFields
              form={form}
              onSubmit={onSubmit}
              isLoading={isLoading}
              isEditMode={isEditMode}
              handleCancel={handleCancel}
              handleEdit={handleEdit}
            />
          ) : (
            <>
              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    <span>Họ và tên</span>
                  </div>
                  <p className="text-sm font-medium">{user.fullName}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    <span>Địa chỉ Email</span>
                  </div>
                  <p className="text-sm font-medium">
                    {user.email || "Chưa cung cấp"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                    <Phone className="h-4 w-4" />
                    <span>Số điện thoại</span>
                  </div>
                  <p className="text-sm font-medium">
                    {user.phoneNumber || "Chưa cung cấp"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                    <Shield className="h-4 w-4" />
                    <span>Vai trò tài khoản</span>
                  </div>
                  <Badge
                    variant={user.role === "Admin" ? "destructive" : "healthy"}
                  >
                    {user.role || "User"}
                  </Badge>
                </div>
              </div>
              <Separator /> {/* Address Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    <span>Địa chỉ</span>
                  </div>
                  <p className="text-sm font-medium">
                    {user.address || "Chưa cung cấp địa chỉ"}
                  </p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Account Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Tài khoản được tạo</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Cập nhật lần cuối</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(user.updatedAt)}
              </p>
            </div>

            {/* // BUG: This should not be used */}
            {/* {user.id && (
              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  <span>User ID</span>
                </div>
                <p className="font-mono text-sm font-medium">{user.id}</p>
              </div>
            )} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInformation;
