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
            <h1 className="text-xl font-bold">Tạo tài khoản của bạn</h1>
            <div className="text-center text-sm">
              Đã có tài khoản?{" "}
              <Link
                href="/sign-in"
                className="underline underline-offset-4 hover:text-green-600"
              >
                Đăng nhập
              </Link>
            </div>
          </div>{" "}
          {/* Body */}
          <div className="flex flex-col gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="border-b pb-2 text-sm font-semibold text-gray-700">
                Thông tin cá nhân
              </h2>

              {/* Full Name and Email Row */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fullName">Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          className="transition-colors focus:border-green-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
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
                          className="transition-colors focus:border-green-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phoneNumber">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="0123456789"
                        className="transition-colors focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <h2 className="border-b pb-2 text-sm font-semibold text-gray-700">
                Thông tin địa chỉ
              </h2>

              {/* Address Number Field */}
              <FormField
                control={form.control}
                name="addressNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="addressNo">Số nhà, tên đường</FormLabel>
                    <FormControl>
                      <Input
                        id="addressNo"
                        type="text"
                        placeholder="123 Nguyễn Trãi"
                        className="transition-colors focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Fields Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* City Field */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="city">Tỉnh/Thành phố</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full transition-colors focus:border-green-500">
                            <SelectValue
                              placeholder={
                                loadingProvinces
                                  ? "Đang tải..."
                                  : "Chọn tỉnh/thành phố"
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
                              Không có tỉnh/thành phố
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* District Field */}
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="district">Quận/Huyện</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("city") || loadingDistricts}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full transition-colors focus:border-green-500">
                            <SelectValue
                              placeholder={
                                !form.watch("city")
                                  ? "Chọn tỉnh/thành phố trước"
                                  : loadingDistricts
                                    ? "Đang tải..."
                                    : "Chọn quận/huyện"
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
                              Không có quận/huyện
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ward Field */}
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="ward">Phường/Xã</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("district") || loadingWards}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full transition-colors focus:border-green-500">
                            <SelectValue
                              placeholder={
                                !form.watch("district")
                                  ? "Chọn quận/huyện trước"
                                  : loadingWards
                                    ? "Đang tải..."
                                    : "Chọn phường/xã"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wards.length > 0 ? (
                            wards.map((ward) => (
                              <SelectItem key={ward.code} value={ward.name}>
                                {ward.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-ward" disabled>
                              Không có phường/xã
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

            {/* Security Information Section */}
            <div className="space-y-4">
              <h2 className="border-b pb-2 text-sm font-semibold text-gray-700">
                Thông tin bảo mật
              </h2>

              {/* Password Fields Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={
                              passwordVisibility.password ? "text" : "password"
                            }
                            placeholder="********"
                            className="pr-10 transition-colors focus:border-green-500"
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
                              <EyeOff className="text-muted-foreground size-4 group-hover:text-green-600" />
                            ) : (
                              <Eye className="text-muted-foreground size-4 group-hover:text-green-600" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Xác nhận mật khẩu
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
                            className="pr-10 transition-colors focus:border-green-500"
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
                              <EyeOff className="text-muted-foreground size-4 group-hover:text-green-600" />
                            ) : (
                              <Eye className="text-muted-foreground size-4 group-hover:text-green-600" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-xs text-green-600 underline-offset-4 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full bg-green-600 text-base font-medium transition-colors hover:cursor-pointer hover:bg-green-600/90"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="size-4 animate-spin" />
                  <span>Đang tạo tài khoản...</span>
                </div>
              ) : (
                "Tạo tài khoản"
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
        Bằng việc nhấp tiếp tục, bạn đồng ý với{" "}
        <Link href="#">Điều khoản dịch vụ</Link> và{" "}
        <Link href="#">Chính sách quyền riêng tư</Link>.
      </div>
    </div>
  );
}
