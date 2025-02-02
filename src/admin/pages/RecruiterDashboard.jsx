import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import Addjobs from "./Addjobs";
import Candidates from "./Candidates";
import Dashboard from "./Dashboard";
import Leftpane from "../components/Leftpane";
import { useSelector } from "react-redux";

export default function RecruiterDashboard() {
  const { user, logOut } = UserAuth();

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
    <div className="bg-gray-300  pb-15 ">
      <div className="grid  grid-cols-12 w-12/12 ">
        <Leftpane />

        <div className=" col-span-10 ">
          <div className=" h-[50px] px-5 bg-white border">
            <div className="flex items-center sm:justify-between justify-end  h-full">
              <h1 className="font-bold hidden sm:block text-sm">
                {" "}
                Candidate List
              </h1>

              <div className="flex items-center ">
                <h2 className="pr-5 text-sm">{user.email}</h2>
                <AiOutlineLogout
                  className="text-xl cursor-pointer hover:text-red-500"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
          <div className="min-h-screen m-3 bg-white rounded-lg p-2">
            <Routes>
              <Route path="recruiterhome/addjobs" element={<Addjobs />} />
              <Route path="recruiterhome/candidates" element={<Candidates />} />
              <Route path="recruiterhome/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
