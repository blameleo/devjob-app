import React from "react";
import { MdFilterAlt, MdSearch } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

function Searchbar() {
  return (
    <form className="border mt-16 rounded-xl w-10/12 mx-auto h-16 flex items-center bg-white text-black">
      <label
        htmlFor=""
        className="w-8/12 sm:w-5/12 lg:w-6/12 flex items-center   sm:border-r h-full"
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
        className="w-5/12 sm:flex hidden items-center  lg:w-4/12   border-r h-full"
      >
        <MdLocationOn className="text-3xl mx-2 text-primary" />
        <input
          type="text"
          className="w-full h-full outline-none placeholder:truncate"
          placeholder="Filter by location..."
        />
      </label>
      <div className="w-7/12 lg:w-4/12 flex justify-around items-center ">
        <div className="hidden sm:flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-900  rounded  "
          />{" "}
          <span className="pl-3 font-semibold sm:text-sm">Full Time Only</span>
        </div>
        <button className="sm:hidden">
          <MdFilterAlt className="text-2xl text-gray-600" />
        </button>
        <button className="hidden sm:block sm:w-24 bg-primary text-white py-3 rounded-lg">
          search
        </button>
        <button className="block sm:hidden bg-primary text-white p-2 rounded-lg">
          <MdSearch />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
