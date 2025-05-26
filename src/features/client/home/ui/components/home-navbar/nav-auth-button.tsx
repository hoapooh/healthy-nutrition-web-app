import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NavAuthButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant={"outline"} className="rounded-sm" size={"sm"}>
        <Link href={"/sign-in"}>Login</Link>
      </Button>
      <Button
        className="rounded-sm bg-green-600 hover:bg-green-600/80"
        size={"sm"}
      >
        <Link href={"/sign-up"}>Sign Up</Link>
      </Button>
    </div>
  );
};

export default NavAuthButton;
