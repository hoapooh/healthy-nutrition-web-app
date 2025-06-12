"use client";

import { useAuth } from "@/store/hooks/use-auth";
import { AuthStatus } from "@/lib/auth-utils";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";

/**
 * AuthStatusIndicator - Shows current authentication status with visual feedback
 * Usage: <AuthStatusIndicator />
 */
export function AuthStatusIndicator() {
  const { authStatus, user } = useAuth();

  const getStatusConfig = (status: AuthStatus) => {
    switch (status) {
      case AuthStatus.LOADING:
        return {
          variant: "secondary" as const,
          icon: <Loader2 className="h-3 w-3 animate-spin" />,
          text: "Đang tải...",
          className: "bg-blue-100 text-blue-800",
        };
      case AuthStatus.AUTHENTICATED:
        return {
          variant: "default" as const,
          icon: <CheckCircle className="h-3 w-3" />,
          text: `Đã đăng nhập với ${user?.fullName || "Người dùng"}`,
          className: "bg-green-100 text-green-800",
        };
      case AuthStatus.UNAUTHENTICATED:
        return {
          variant: "secondary" as const,
          icon: <XCircle className="h-3 w-3" />,
          text: "Chưa đăng nhập",
          className: "bg-gray-100 text-gray-800",
        };
      case AuthStatus.ERROR:
        return {
          variant: "destructive" as const,
          icon: <AlertCircle className="h-3 w-3" />,
          text: "Lỗi xác thực",
          className: "bg-red-100 text-red-800",
        };
      default:
        return {
          variant: "secondary" as const,
          icon: null,
          text: "Không xác định",
          className: "bg-gray-100 text-gray-800",
        };
    }
  };

  const config = getStatusConfig(authStatus);

  return (
    <Badge
      variant={config.variant}
      className={`flex items-center gap-1 ${config.className}`}
    >
      {config.icon}
      {config.text}
    </Badge>
  );
}
