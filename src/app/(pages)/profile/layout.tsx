import Link from "next/link";
import { AiFillProfile } from "react-icons/ai";
import { PiFilmReelFill } from "react-icons/pi";
import { BsPostcardFill } from "react-icons/bs";
import { RiProfileFill } from "react-icons/ri";
import { GiShadowFollower } from "react-icons/gi";
import { SlUserFollowing } from "react-icons/sl";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="flex flex-col md:flex-row items-center gap-10 md:gap-14 justify-between md:items-start pt-10 md:pt-[70px] mb-10">
      <aside className="md:w-[320px] w-full border-2 border-black-100 dark:border-blue-300 px-5 py-8 rounded-[10px]">
        <ul className="flex flex-col gap-y-5">
          <li>
            <Link
              className="text-base font-semibold py-2 border-gray-500 hover:outline outline-1 outline-black px-3 rounded-md transition-all tracking-[1.3px] flex items-center gap-x-4"
              href="/profile"
            >
              <AiFillProfile size={24} /> Your Posts And Reels
            </Link>
          </li>
          <li>
            <Link
              className="text-base font-semibold py-2 border-gray-500 hover:outline outline-1 outline-black px-3 rounded-md transition-all tracking-[1.3px] flex items-center gap-x-4"
              href="/profile/create-reels"
            >
              <PiFilmReelFill size={24} /> Create Reels
            </Link>
          </li>
          <li>
            <Link
              className="text-base font-semibold py-2 hover:outline outline-1 outline-black px-3 rounded-md transition-all tracking-[1.3px] flex items-center gap-x-4"
              href="/profile/create-posts"
            >
              <BsPostcardFill size={24} /> Create Posts
            </Link>
          </li>
        </ul>
      </aside>
      <section className="w-full md:w-3/4 md:p-10 p-5 min-h-[407px] rounded-[10px] border-2 border-black dark:border-blue-300">
        {children}
      </section>
    </article>
  );
}
