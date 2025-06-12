"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="mx-auto w-full max-w-md px-6 text-center">
        <div className="mb-8">
          <AlertTriangle className="mx-auto mb-4 h-24 w-24 text-red-500" />
          <h1 className="mb-2 text-4xl font-bold text-red-500">403</h1>{" "}
          <h2 className="mb-4 text-2xl font-semibold text-red-500">
            Truy cập bị từ chối
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Xin lỗi, bạn không có quyền truy cập trang này. Vui lòng liên hệ với
            quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.replace("/")}
            className="flex w-full items-center justify-center gap-2"
            variant={"healthy"}
          >
            {" "}
            <Home className="h-4 w-4" />
            Về trang chủ
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex w-full items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Cần trợ giúp? Liên hệ hỗ trợ tại support@healthynutrition.com</p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
