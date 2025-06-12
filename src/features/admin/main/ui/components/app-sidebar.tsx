"use client";

import * as React from "react";
import {
  IconBrandBlogger,
  IconCamera,
  IconCategory2,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPackages,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./navigation/nav-main";
// import { NavDocuments } from "./navigation/nav-documents";
// import { NavSecondary } from "./navigation/nav-secondary";
import { NavUser } from "./navigation/nav-user";
import { useAuth } from "@/store/hooks/use-auth";
import { AuthStatus } from "@/lib/auth-utils";
import AppLoader from "@/features/shared/ui/components/app-loader";

const data = {
  navMain: [
    { title: "Bảng điều khiển", url: "/admin/dashboard", icon: IconDashboard },
    {
      title: "Người dùng",
      url: "/admin/manage-users",
      icon: IconUsers,
    },
    {
      title: "Phản hồi",
      url: "/admin/manage-feedbacks",
      icon: IconListDetails,
    },
    {
      title: "Giao dịch",
      url: "/admin/manage-transactions",
      icon: IconChartBar,
    },
    {
      title: "Sản phẩm",
      url: "/admin/manage-products",
      icon: IconPackages,
    },
    {
      title: "Danh mục",
      url: "/admin/manage-categories",
      icon: IconCategory2,
    },
    {
      title: "Bài viết",
      url: "/admin/manage-blogs",
      icon: IconBrandBlogger,
    },
  ],
  navClouds: [
    {
      title: "Ghi nhận",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Đề xuất đang hoạt động",
          url: "#",
        },
        {
          title: "Đã lưu trữ",
          url: "#",
        },
      ],
    },
    {
      title: "Đề xuất",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Đề xuất đang hoạt động",
          url: "#",
        },
        {
          title: "Đã lưu trữ",
          url: "#",
        },
      ],
    },
    {
      title: "Gợi ý",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Đề xuất đang hoạt động",
          url: "#",
        },
        {
          title: "Đã lưu trữ",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Cài đặt",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Trợ giúp",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Tìm kiếm",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Thư viện dữ liệu",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Báo cáo",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Trợ lý văn bản",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { authStatus, user } = useAuth();

  if (authStatus === AuthStatus.LOADING) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <div className="flex h-full w-full items-center justify-center">
            <AppLoader />
          </div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Healthy Nutrition
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: user?.email,
            avatar: user?.image,
            name: user?.fullName,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
