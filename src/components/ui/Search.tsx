"use client";
import { Button } from "./button";
import { Input } from "./input";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <form className="w-full max-w-[500px] h-10 flex gap-3 mx-5">
      <Input className="h-full border-black dark:border-white" />
      <Button className="h-full p-3">
        <FiSearch size={22} />
      </Button>
    </form>
  );
};

export default Search;
