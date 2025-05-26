import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/store-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
