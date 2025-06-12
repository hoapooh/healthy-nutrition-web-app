"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";
import { selectCartTotalItems } from "@/store/slices/cart-slice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface MobileNavProps {
  menu: MenuItem[];
}

const MobileNav = ({ menu }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const cartItemsCount = useAppSelector(selectCartTotalItems);

  const toggleSubmenu = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const handleLinkClick = () => {
    setOpen(false);
    setOpenItems([]);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Bật/Tắt Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[300px] flex-col sm:w-[350px]"
      >
        {" "}
        <SheetHeader className="text-left">
          <SheetTitle>Thực đơn</SheetTitle>
          {/* Logo */}
          <div className="flex justify-center py-4">
            <Link href="/" onClick={handleLinkClick}>
              <Image
                src="/healthy-nutrition.png"
                width={180}
                height={45}
                alt="Healthy Nutrition Logo"
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>
        </SheetHeader>
        <div className="mt-6 flex flex-1 flex-col gap-4">
          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1">
            {menu.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <Collapsible
                    open={openItems.includes(item.title)}
                    onOpenChange={() => toggleSubmenu(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-between px-4 text-left font-medium"
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openItems.includes(item.title) ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 ml-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          onClick={handleLinkClick}
                          className="hover:bg-muted flex items-center gap-3 rounded-lg p-3 transition-colors"
                        >
                          {subItem.icon && (
                            <div className="text-foreground flex-shrink-0">
                              {subItem.icon}
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {subItem.title}
                            </div>
                            {subItem.description && (
                              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                                {subItem.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={item.url}
                    onClick={handleLinkClick}
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      className="h-12 w-full justify-start px-4 text-left font-medium"
                    >
                      {item.title}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Spacer to push content to bottom */}
          <div className="flex-1" />

          {/* Bottom Section */}
          <div className="space-y-3 border-t pt-4">
            {/* Cart Link */}
            <Link
              href="/cart"
              onClick={handleLinkClick}
              className="hover:bg-muted flex items-center justify-between rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Shopping Cart</span>
              </div>
              {cartItemsCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
