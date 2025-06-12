"use client";

import React from "react";
import { User } from "@/types/auth";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User as UserIcon,
  Shield,
} from "lucide-react";

interface UserDetailsDrawerProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDrawer({
  user,
  open,
  onOpenChange,
}: UserDetailsDrawerProps) {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mt-0 h-full w-[400px] rounded-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>User Details</DrawerTitle>
          <DrawerDescription>
            Complete information about the selected user
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-6 px-4 pb-4">
          {/* User Avatar and Basic Info */}
          <div className="bg-muted/30 flex flex-col items-center space-y-4 rounded-lg p-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.image}
                alt={user.fullName}
                className="object-cover"
              />
              <AvatarFallback className="text-lg">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold">{user.fullName}</h3>
              <Badge
                variant={user.role === "Admin" ? "default" : "secondary"}
                className="capitalize"
              >
                <Shield className="mr-1 h-3 w-3" />
                {user.role}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            {" "}
            <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Thông tin liên hệ
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-muted-foreground h-4 w-4" />{" "}
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">
                    {user.email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Số điện thoại</p>
                  <p className="text-muted-foreground text-sm">
                    {user.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Địa chỉ</p>
                  <p className="text-muted-foreground text-sm">
                    {user.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Information */}
          <div className="space-y-4">
            {" "}
            <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Thông tin tài khoản
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <UserIcon className="text-muted-foreground h-4 w-4" />{" "}
                <div>
                  <p className="text-sm font-medium">ID Người dùng</p>
                  <p className="text-muted-foreground font-mono text-sm">
                    {user.id || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Ngày tạo</p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Cập nhật lần cuối</p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
