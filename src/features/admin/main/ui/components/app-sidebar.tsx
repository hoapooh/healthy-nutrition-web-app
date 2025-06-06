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
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/admin/manage-users",
      icon: IconUsers,
    },
    {
      title: "Feedbacks",
      url: "/admin/manage-feedbacks",
      icon: IconListDetails,
    },
    {
      title: "Transactions",
      url: "/admin/manage-transactions",
      icon: IconChartBar,
    },
    {
      title: "Products",
      url: "/admin/manage-products",
      icon: IconPackages,
    },
    {
      title: "Categories",
      url: "/admin/manage-categories",
      icon: IconCategory2,
    },
    {
      title: "Blogs",
      url: "/admin/manage-blogs",
      icon: IconBrandBlogger,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
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
                <span className="text-base font-semibold">Acme Inc.</span>
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
