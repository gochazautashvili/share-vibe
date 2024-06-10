import Link from "next/link";
import dynamic from "next/dynamic";
const Menu = dynamic(() => import("./Menu"), {
  ssr: false,
  loading: () => (
    <div className="w-10 h-10 bg-slate-400 rounded-full animate-pulse" />
  ),
});
const UserButton = dynamic(() => import("./ui/UserButton"), {
  ssr: false,
  loading: () => (
    <div className="w-10 h-10 bg-slate-400 rounded-full animate-pulse" />
  ),
});
const Search = dynamic(() => import("./ui/Search"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[500px] h-10 bg-slate-400 rounded-md animate-pulse mx-4" />
  ),
});

const Header = () => {
  return (
    <header className="w-full h-[80px] shadow-sm bg-blue-200 bg-opacity-40 backdrop-blur-sm dark:bg-black-100 shadow-blue-900 dark:shadow-gray-700 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      <nav className="flex justify-between items-center w-full max-w-[1400px] mx-auto px-3 md:px-4 lg:px-2">
        <div className="flex items-center gap-3">
          <Menu />
          <Link
            href="/"
            className="text-black hidden sm:flex dark:text-white text-2xl md:text-3xl font-semibold text-center text-nowrap"
          >
            Share Vibe
          </Link>
        </div>
        <UserButton />
      </nav>
    </header>
  );
};

export default Header;
