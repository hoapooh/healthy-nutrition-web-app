import { ThemeProvider } from "@/components/providers/theme-provider";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { ActiveThemeProvider } from "@/features/admin/main/ui/components/active-theme";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/main/ui/components/app-sidebar";
import { SiteHeader } from "@/features/admin/main/ui/components/navigation/site-header";

/* const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}; */

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <div
      className={cn(
        "bg-background overscroll-none font-sans antialiased",
        activeThemeValue ? `theme-${activeThemeValue}` : "",
        isScaled ? "theme-scaled" : "",
      )}
    >
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
