import React from "react";
import ThemeToggle from "./ThemeToggle";
import Searchbar from "./Searchbar";
// import headerimg from "../assets/desktop/bg-pattern-header.svg";

const Header = () => {
  return (
    <div className="h-40  text-white bg-header_image_mobile sm:bg-header_image">
      <div className="flex justify-between pt-5 px-10">
        <h1 className="text-2xl sm:text-3xl font-bold">devjobs</h1>
        <ThemeToggle />
      </div>
      <Searchbar />
    </div>
  );
};

export default Header;
