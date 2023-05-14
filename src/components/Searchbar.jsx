import React from "react";
import { MdFilter, MdSearch } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

function Searchbar() {
  return (
    <form className="border mt-16 rounded-xl w-9/12 mx-auto h-16 flex items-center bg-white text-black">
      <label
        htmlFor=""
        className="w-8/12 md:w-5/12 flex items-center   sm:border-r h-full"
      >
        <MdSearch className="hidden sm:block text-3xl mx-2 text-primary" />
        <input
          type="text"
          className="w-full h-full outline-none rounded-xl sm:pl-0 pl-10   placeholder:truncate"
          placeholder="Filter by title..."
        />
      </label>
      <label
        htmlFor=""
        className="w-5/12 md:flex hidden items-center    border-r h-full"
      >
        <MdLocationOn className="text-3xl mx-2 text-primary" />
        <input
          type="text"
          className="w-full h-full outline-none placeholder:truncate"
          placeholder="Filter by location..."
        />
      </label>
      <div className="w-4/12 flex justify-evenly items-center ">
        <div className="hidden md:block">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-900  rounded  "
          />{" "}
          <span className="pl-3 font-semibold">fulltime</span>
        </div>
        <button className="md:hidden">
          <MdFilter />
        </button>
        <button className="hidden md:block bg-primary text-white p-2 rounded-lg">
          search
        </button>
        <button className="block md:hidden bg-primary text-white p-2 rounded-lg">
          <MdSearch />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
