import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";
// import headerimg from "../assets/desktop/bg-pattern-header.svg";

const Header = ({ jobs, setSearchResults }) => {
  const { user, logOut } = UserAuth();

  console.log(user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="h-48  text-white bg-header_image_mobile sm:bg-header_image bg-cover">
      <div className="flex justify-between pt-5 px-10">
        <div className="sm:flex">
          <h1
            className="text-2xl sm:text-3xl font-bold cursor-pointer mr-8"
            onClick={() => {
              navigate("/home");
              window.location.reload();
            }}
          >
            devjobs
          </h1>

          <ThemeToggle />
        </div>

        <div className="sm:flex-row items-center flex flex-col">
          <div className="">welcome: {user.email}</div>
          <button
            onClick={handleLogout}
            className="hover:bg-light_primary ml-5 bg-white p-3 rounded-lg font-semibold text-primary "
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
