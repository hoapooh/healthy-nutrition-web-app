"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import NavAuthButton from "./nav-auth-button";
import NavMenu from "./nav-menu";
import MobileNav from "./mobile-nav";
import { menuData } from "../../../data/nav-menu-data";
import { useIsMobile } from "@/hooks/use-mobile";

const HomeNavbar = () => {
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  // Transform scroll position to shadow opacity
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Transform scroll position to padding block
  const paddingBlock = useTransform(scrollY, [0, 100], ["10px", "0px"]);
  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between bg-white px-3 transition-transform duration-150 md:px-2 md:pr-5"
      style={{
        boxShadow: useTransform(
          shadowOpacity,
          (opacity) =>
            `0 4px 6px -1px rgba(0, 0, 0, ${opacity * 0.1}), 0 2px 4px -1px rgba(0, 0, 0, ${opacity * 0.06})`,
        ),
        paddingBlock: paddingBlock,
      }}
    >
      <div className="container mx-auto flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          {isMobile && <MobileNav menu={menuData} />}

          {/* Logo */}
          {!isMobile && (
            <div className="flex shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  src={"/healthy-nutrition.png"}
                  width={isMobile ? 150 : 160}
                  height={isMobile ? 37 : 50}
                  alt="Healthy Nutrition Logo"
                  className="h-auto w-auto"
                  priority
                />
              </Link>
            </div>
          )}

          {/* Desktop Navigation Menu */}
          <div className="hidden flex-1 md:flex">
            <NavMenu menu={menuData} />
          </div>
        </div>

        {/* Authentication Button - Always visible */}
        <div className="flex shrink-0">
          <NavAuthButton />
        </div>
      </div>
    </motion.nav>
  );
};

export default HomeNavbar;
