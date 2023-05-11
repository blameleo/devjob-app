import React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  return (
    <div className="flex justify-between  w-24 items-center h-10">
      <MdLightMode />
      <label className="relative inline-flex items-center  cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-white rounded-full peer dark:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-blue-500 after:border-blue-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
      </label>
      <MdDarkMode />
    </div>
  );
};

export default ThemeToggle;
