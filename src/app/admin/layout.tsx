import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ActiveThemeProvider } from "@/components/providers/active-theme";
import { AppSidebar } from "@/features/admin/main/ui/components/app-sidebar";
import { SiteHeader } from "@/features/admin/main/ui/components/navigation/site-header";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;

  return (
    <div className={cn("bg-background overscroll-none font-sans antialiased")}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        <ActiveThemeProvider initialTheme={activeThemeValue}>
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
        </ActiveThemeProvider>
      </ThemeProvider>
    </div>
  );
};

export default AdminLayout;
