"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";

const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
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
            <h1 className="text-xl font-bold">Cập nhật mật khẩu</h1>
            <div className="text-center text-sm">
              Chúng tôi sẽ gửi cho bạn email hướng dẫn cách đặt lại mật khẩu.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button
              type="button"
              onClick={() => toast.success("Tính năng này sẽ sớm ra mắt!")}
              variant={"healthy"}
              className="w-full"
            >
              Gửi email cho tôi
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Bằng việc nhấp tiếp tục, bạn đồng ý với
        <Link href="#">Điều khoản dịch vụ</Link> và
        <Link href="#">Chính sách quyền riêng tư</Link>.
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
