"use client";
import Link from "next/link";
import { Switch } from "./switch";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { PiSunglassesBold } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const user = useSession();

  const handelChange = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const imageUrl = `https://res.cloudinary.com/dxesljzkl/image/upload/w_60,h_60,c_fill/v1716907004/${user.data?.user.image_id}.png`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage
            width={40}
            height={40}
            src={user ? imageUrl : "/user-button-image.png"}
          />
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10">
          <Link
            href="/profile"
            className="flex items-center gap-3 w-full h-full"
          >
            <FaUser /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-10">
          {user ? (
            <button
              onClick={() => signOut()}
              type="button"
              className="flex items-center gap-3"
            >
              <HiLogout /> Sign Out
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-3 w-full h-full"
            >
              <HiLogout /> Sign In
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handelChange} className="h-10">
          <PiSunglassesBold /> <Switch className="ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
