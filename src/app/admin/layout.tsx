import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ActiveThemeProvider } from "@/components/providers/active-theme";

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
          {children}
        </ActiveThemeProvider>
      </ThemeProvider>
    </div>
  );
};

export default AdminLayout;
