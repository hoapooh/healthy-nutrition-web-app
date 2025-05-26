import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavMenu } from "./nav-menu";

const HomeNavbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center bg-white px-2 pr-5">
      <div className="flex w-full items-center gap-4">
        {/* Menu and logo */}

        <div className="flex shrink-0 items-center">
          <Link href={"/"}>
            <div className="flex items-center gap-1 p-4">
              <Image
                src={"/next.svg"}
                width={64}
                height={32}
                alt="Next.js Logo"
              />

              <p className="text-xl font-semibold tracking-tight text-green-600">
                Healthy<span className="text-black">Nutrition</span>
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}

        <NavMenu />
      </div>
    </nav>
  );
};

export default HomeNavbar;
