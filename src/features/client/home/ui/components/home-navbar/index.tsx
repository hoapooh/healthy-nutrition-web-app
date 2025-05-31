"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import NavAuthButton from "./nav-auth-button";
import NavMenu from "./nav-menu";
import { menuData } from "../../../data/nav-menu-data";

const HomeNavbar = () => {
  const { scrollY } = useScroll();

  // Transform scroll position to shadow opacity
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Transform scroll position to padding block
  const paddingBlock = useTransform(scrollY, [0, 100], ["10px", "0px"]);

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between bg-white px-2 pr-5 transition-transform duration-150"
      style={{
        boxShadow: useTransform(
          shadowOpacity,
          (opacity) =>
            `0 4px 6px -1px rgba(0, 0, 0, ${opacity * 0.1}), 0 2px 4px -1px rgba(0, 0, 0, ${opacity * 0.06})`,
        ),
        paddingBlock: paddingBlock,
      }}
    >
      <div className="flex w-full items-center gap-4">
        {/* Menu and logo */}
        <div className="flex shrink-0 items-center">
          <Link href={"/"}>
            <Image
              src={"/healthy-nutrition.png"}
              width={200}
              height={50}
              alt="Healthy Nutrition Logo"
            />

            {/*  <p className="text-xl font-semibold tracking-wide text-green-600">
                Healthy<span className="text-black">Nutrition</span>
              </p> */}
          </Link>
        </div>

        {/* Navigation Menu */}
        <NavMenu menu={menuData} />
      </div>{" "}
      {/* Authentication Button */}
      <NavAuthButton />
    </motion.nav>
  );
};

export default HomeNavbar;
