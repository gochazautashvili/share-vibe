"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMenu } from "react-icons/fi";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { BsFileEarmarkPost } from "react-icons/bs";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <FiMenu size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10">
          <Link href="/" className="flex items-center gap-3 w-full h-full">
            <AiFillHome /> Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-10">
          <Link href="/reels" className="flex items-center gap-3 w-full h-full">
            <BsFillCameraReelsFill /> Reels
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-10">
          <Link href="/posts" className="flex items-center gap-3 w-full h-full">
            <BsFileEarmarkPost /> Posts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10">
          <Link
            href="/"
            className="text-black dark:text-white text-2xl md:text-3xl font-semibold text-center text-nowrap w-full h-full"
          >
            Share Vibe
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
