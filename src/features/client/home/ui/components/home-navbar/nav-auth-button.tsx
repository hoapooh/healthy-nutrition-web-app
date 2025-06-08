"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/hooks/use-auth";
import { AuthStatus } from "@/lib/auth-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Loader2, ShoppingCart, History } from "lucide-react";
import Link from "next/link";
import React from "react";
import useLogOut from "@/store/hooks/use-log-out";
import { useAppSelector } from "@/store/hooks";
import { selectCartTotalItems } from "@/store/slices/cart-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavAuthButton = () => {
  const { authStatus, user } = useAuth();
  const { handleLogout } = useLogOut();
  const cartItemsCount = useAppSelector(selectCartTotalItems);

  // Use authStatus to determine what to render
  switch (authStatus) {
    case AuthStatus.LOADING:
      return (
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-muted-foreground text-sm">Loading...</span>
          </div>
        </div>
      );
    case AuthStatus.AUTHENTICATED:
      return (
        <div className="flex shrink-0 items-center gap-3">
          {/* Cart Button */}
          <Link href="/cart">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-xs"
                    >
                      {cartItemsCount > 99 ? "99+" : cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>View Cart ({cartItemsCount})</span>
              </TooltipContent>
            </Tooltip>
          </Link>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    className="object-cover"
                    src={user?.image}
                    alt={user?.fullName}
                  />
                  <AvatarFallback>
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm leading-none font-medium">
                  {user?.fullName}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/order-history" className="flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  <span>Order History</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    case AuthStatus.UNAUTHENTICATED:
      return (
        <div className="flex shrink-0 items-center gap-2">
          {/* Cart Button */}
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full p-0 text-xs"
                >
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth Buttons */}
          <Button
            asChild
            variant={"outline"}
            className="rounded-sm"
            size={"sm"}
          >
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button
            className="rounded-sm bg-green-600 hover:cursor-pointer hover:bg-green-600/80"
            size={"sm"}
            asChild
          >
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </div>
      );

    case AuthStatus.ERROR:
      return (
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm text-red-600">Auth Error</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/sign-in">Retry</Link>
          </Button>
        </div>
      );

    default:
      return null;
  }
};

export default NavAuthButton;
