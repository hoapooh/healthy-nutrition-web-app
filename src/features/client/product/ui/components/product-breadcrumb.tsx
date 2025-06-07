"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
  className?: string;
}

export const ProductBreadcrumb = ({
  productName,
  className = "",
}: ProductBreadcrumbProps) => {
  return (
    <div className={className}>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="text-muted-foreground flex items-center space-x-2 text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-primary">{productName}</span>
        </div>
      </nav>
      
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  );
};
