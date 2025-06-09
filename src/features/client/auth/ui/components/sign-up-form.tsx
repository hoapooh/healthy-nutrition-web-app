"use client";

import { Eye, EyeOff, GalleryVerticalEnd, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useSignUpHook from "../../hooks/use-sign-up-hook";

export function SignUpForm({
  className,

  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    form,
    onSubmit,
    isLoading,
    passwordVisibility,
    togglePasswordVisibility,
    provinces,
    districts,
    wards,
    loadingProvinces,
    loadingDistricts,
    loadingWards,
  } = useSignUpHook();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">HealthyNutrition.</span>
            </Link>

            <h1 className="text-xl font-bold">Create your account</h1>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="underline underline-offset-4 hover:text-green-600"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6">
            {/* Full Name Field */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            {/* Email Field */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Address Fields */}
            <div className="grid gap-4">
              <FormLabel className="text-sm font-medium">Address</FormLabel>
              {/* Address Number Field */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="addressNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="addressNo">No.</FormLabel>
                      <FormControl>
                        <Input
                          id="addressNo"
                          type="text"
                          placeholder="123"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>{" "}
              {/* City Field */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                loadingProvinces
                                  ? "Loading cities..."
                                  : "Select city"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provinces.length > 0 ? (
                            provinces.map((province) => (
                              <SelectItem
                                key={province.code}
                                value={province.name}
                              >
                                {province.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-city" disabled>
                              No cities available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>{" "}
              {/* District Field */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="district">District</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("city") || loadingDistricts}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                !form.watch("city")
                                  ? "Select city first"
                                  : loadingDistricts
                                    ? "Loading districts..."
                                    : "Select district"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.length > 0 ? (
                            districts.map((district) => (
                              <SelectItem
                                key={district.code}
                                value={district.name}
                              >
                                {district.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-district" disabled>
                              No districts available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Ward Field */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="ward">Ward</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("district") || loadingWards}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                !form.watch("district")
                                  ? "Select district first"
                                  : loadingWards
                                    ? "Loading wards..."
                                    : "Select ward"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>{" "}
                        <SelectContent>
                          {wards.length > 0 ? (
                            wards.map((ward) => (
                              <SelectItem key={ward.code} value={ward.name}>
                                {ward.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-ward" disabled>
                              No wards available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        href="#"
                        className="inline-block text-xs underline-offset-4 hover:text-green-600 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={
                            passwordVisibility.password ? "text" : "password"
                          }
                          placeholder="********"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="group absolute top-1/2 right-0 h-full -translate-y-1/2 px-3 py-2 hover:cursor-pointer hover:bg-transparent"
                          onClick={() => togglePasswordVisibility("password")}
                        >
                          {passwordVisibility.password ? (
                            <EyeOff className="text-muted-foreground size-5 group-hover:text-green-600" />
                          ) : (
                            <Eye className="text-muted-foreground size-5 group-hover:text-green-600" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={
                            passwordVisibility.confirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="********"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="group absolute top-1/2 right-0 h-full -translate-y-1/2 px-3 py-2 hover:cursor-pointer hover:bg-transparent"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                        >
                          {passwordVisibility.confirmPassword ? (
                            <EyeOff className="text-muted-foreground size-5 group-hover:text-green-600" />
                          ) : (
                            <Eye className="text-muted-foreground size-5 group-hover:text-green-600" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:cursor-pointer hover:bg-green-600/80"
            >
              {isLoading ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
          </div>

          {/* ----Or---- */}
          {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div> */}

          {/* Third Provider Login */}
          {/* <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Continue with Apple
              </Button>
  
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div> */}
        </form>
      </Form>

      {/* Term and Service */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
