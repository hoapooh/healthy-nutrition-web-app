import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/main/ui/components/app-sidebar";
import { SiteHeader } from "@/features/admin/main/ui/components/navigation/site-header";
import ProtectedRoute from "@/features/shared/ui/components/protected/protected-route";

const ManagementLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute
      redirectTo="/admin/login"
      requireAuth
      allowedRoles={["Admin"]}
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default ManagementLayout;
