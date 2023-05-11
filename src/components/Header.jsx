import React from "react";
import ThemeToggle from "./ThemeToggle";
// import headerimg from "../assets/desktop/bg-pattern-header.svg";

const Header = () => {
  return (
    <div className="h-40 flex justify-between pt-5 px-10 text-white bg-header_image_mobile sm:bg-header_image">
      <h1 className="text-2xl sm:text-3xl font-bold">devjobs</h1>
      <ThemeToggle />
    </div>
  );
};

export default Header;
