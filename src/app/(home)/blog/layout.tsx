import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Latest Articles and Recipes",
  description:
    "Discover the latest articles about cooking, nutrition, and healthy living.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
