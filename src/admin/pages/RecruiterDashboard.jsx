import React from "react";
import { Routes, Route } from "react-router-dom";

import { AiFillHome, AiOutlineLogout } from "react-icons/ai";

import Addjobs from "./Addjobs";
import Candidates from "./Candidates";
import Dashboard from "./Dashboard";
import Leftpane from "../components/Leftpane";

export default function RecruiterDashboard() {
  return (
    <div className="bg-gray-300  pb-15">
      <div className="grid  grid-cols-12 w-12/12 h-screen">
        <Leftpane />

        <div className=" col-span-9 ">
          <div className=" h-[50px] px-5 bg-white border">
            <div className="flex items-center justify-between  h-full">
              <h1 className="font-bold"> Candidate List</h1>

              <div className="flex items-center">
                <h2 className="pr-5">John Blackwood</h2>
                <AiOutlineLogout className="text-xl" />
              </div>
            </div>
          </div>
          <div className=" h-[700px] m-5 bg-white rounded-lg p-2">
            <Routes>
              <Route path="recruiterhome/addjobs" element={<Addjobs />} />
              <Route path="recruiterhome/candidates" element={<Candidates />} />
              <Route path="recruiterhome/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
