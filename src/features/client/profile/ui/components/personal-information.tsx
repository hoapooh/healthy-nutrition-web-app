"use client";

import React from "react";
import { useAuth } from "@/store/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";

const PersonalInformation = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">No user information available</p>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided";

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.image}
                alt={user.fullName}
                className="object-cover"
              />
              <AvatarFallback className="bg-green-100 text-lg font-semibold text-green-600">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                {user.role && (
                  <Badge
                    variant={
                      user.role === "Admin" ? "destructive" : "secondary"
                    }
                    className="flex items-center space-x-1"
                  >
                    <Shield className="h-3 w-3" />
                    <span>{user.role}</span>
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Details</span>
          </CardTitle>
          <CardDescription>
            Your personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </div>
              <p className="text-sm font-medium">{user.fullName}</p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </div>
              <p className="text-sm font-medium">
                {user.email || "Not provided"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </div>
              <p className="text-sm font-medium">
                {user.phoneNumber || "Not provided"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Account Role</span>
              </div>
              <Badge
                variant={user.role === "Admin" ? "destructive" : "secondary"}
              >
                {user.role || "User"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Address Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <MapPin className="h-4 w-4" />
                <span>Address</span>
              </div>
              <p className="text-sm font-medium">
                {user.address || "No address provided"}
              </p>
            </div>
          </div>

          <Separator />

          {/* Account Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Account Created</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Last Updated</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(user.updatedAt)}
              </p>
            </div>

            {user.id && (
              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center space-x-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  <span>User ID</span>
                </div>
                <p className="font-mono text-sm font-medium">{user.id}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInformation;
