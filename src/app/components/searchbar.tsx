"use client";
import { useState } from "react";
import { useTaskStore } from "../store/store";

type Props = {};

export default function Searchbar({}: Props) {
  const { searchText } = useTaskStore();
 
  const [searchbox, setSearchbox] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchbox(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchText(searchbox)
    setSearchbox("");
  };
  return (
    <form
      onSubmit={handleSearch}
      className="p-4 lg:pt-5 w-full lg:w-[40%]  h-[5%]"
    >
      <input
        onChange={handleSearchInput}
        value={searchbox}
        className="w-full rounded-[6px] text-slate-950 text-[14px] h-[34px] p-3"
        placeholder="Search..."
      />
    </form>
  );
}
