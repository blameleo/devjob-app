import React from "react";
import Tabs from "../components/Tabs";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaNewspaper } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Leftpane() {
  return (
    <div className="bg-white col-span-2  h-full  ">
      <Link to="recruiterhome/dashboard">
        <h1 className="cursor-pointer sm:text-2xl font-black pl-5 border h-[50px]">
          Devjobs
        </h1>
      </Link>

      <div className="mt-10">
        <Tabs
          icon={<AiFillHome className="text-violet-700" />}
          text="Dashboard"
          link="recruiterhome/dashboard"
        />
        <Tabs
          icon={<FaNewspaper className="text-violet-700" />}
          text="Jobs"
          link="recruiterhome/addjobs"
        />

        <Tabs
          icon={<BiUser className="text-violet-700" />}
          text="Candidates"
          link="recruiterhome/candidates"
        />
      </div>
    </div>
  );
}
