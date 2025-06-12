import type { Metadata } from "next";

import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/store-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
});

const oswald = Oswald({
  subsets: ["latin"],
});

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oswald.className} antialiased`}>
        <StoreProvider>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
          <Analytics />
        </StoreProvider>
      </body>
    </html>
  );
}
