import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/store-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Healthy Nutrition",
    default: "Healthy Nutrition",
  },
  description: "A website for selling healthy nutrition products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
          <Analytics />
        </StoreProvider>
      </body>
    </html>
  );
}
