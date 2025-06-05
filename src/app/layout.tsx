import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/store-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Healthy Nutrition",
    default: "Healthy Nutrition",
  },
  description: "A website for selling healthy nutrition products",
  keywords: [
    "healthy nutrition",
    "nutrition products",
    "health",
    "wellness",
    "eat clean",
  ],
  authors: [
    {
      name: "Healthy Nutrition Team",
      url: "https://healthynutrition-xi.vercel.app/",
    },
  ],
  creator: "WAG Team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
