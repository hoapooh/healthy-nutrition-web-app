"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Shield, LoaderCircle } from "lucide-react";

// UI Components
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

import useAdminSignInHook from "../../hooks/use-admin-sign-in-hook";

const AdminLoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { form, onSubmit, isLoading, showPassword, togglePasswordVisibility } =
    useAdminSignInHook();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-amber-600">
              <Shield className="h-8 w-8 text-white" />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Portal
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Sign in to access the admin dashboard
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="email"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@healthynutrition.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="password"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="group absolute top-1/2 right-0 h-full -translate-y-1/2 px-3 hover:bg-transparent dark:hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-600" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Login Button */}
            <Button
              type="submit"
              className="mt-6 h-11 w-full bg-gradient-to-r from-green-600 to-amber-600 font-medium text-white hover:from-green-600/80 hover:to-amber-600/80"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              This is a secure admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminLoginForm;
