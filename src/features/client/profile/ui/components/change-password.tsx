"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Key, LoaderCircle, Shield } from "lucide-react";
import useChangePassword from "../../hooks/use-change-password";

const ChangePassword = () => {
  const {
    form,
    onSubmit,
    isLoading,
    passwordVisibility,
    togglePasswordVisibility,
  } = useChangePassword();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <span>Change Password</span>
        </CardTitle>
        <CardDescription>
          Update your password to keep your account secure. Make sure to use a
          strong password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Current Password</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          passwordVisibility.oldPassword ? "text" : "password"
                        }
                        placeholder="Enter your current password"
                        {...field}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="group absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("oldPassword")}
                      >
                        {passwordVisibility.oldPassword ? (
                          <EyeOff className="text-muted-foreground h-4 w-4 group-hover:text-green-600" />
                        ) : (
                          <Eye className="text-muted-foreground h-4 w-4 group-hover:text-green-600" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Key className="h-4 w-4" />
                    <span>New Password</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          passwordVisibility.newPassword ? "text" : "password"
                        }
                        placeholder="Enter your new password"
                        {...field}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="group absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("newPassword")}
                      >
                        {passwordVisibility.newPassword ? (
                          <EyeOff className="text-muted-foreground h-4 w-4 group-hover:text-green-600" />
                        ) : (
                          <Eye className="text-muted-foreground h-4 w-4 group-hover:text-green-600" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm New Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Key className="h-4 w-4" />
                    <span>Confirm New Password</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          passwordVisibility.confirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm your new password"
                        {...field}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="group absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {passwordVisibility.confirmPassword ? (
                          <EyeOff className="text-muted-foreground h-4 w-4 group-hover:text-green-600" />
                        ) : (
                          <Eye className="text-muted-foreground h-4 w-4 group-hover:text-green-600" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Requirements */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="mb-2 text-sm font-medium">
                Password Requirements:
              </h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• At least 3 characters long</li>
                <li>• Different from your current password</li>
                <li>
                  • Use a combination of letters, numbers, and special
                  characters
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Update Password</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
