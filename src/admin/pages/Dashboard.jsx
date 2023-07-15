import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/JobSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, []);
  const state = useSelector((state) => {
    return state.users;
  });

  const stateTwo = useSelector((state) => {
    return state.jobs;
  });

  return (
    <div>
      <div className="flex">
        <div className="border flex justify-center items-center w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            users <sup>{state.users.length}+</sup>
          </h1>
        </div>
        <div className="ml-10 flex justify-center items-center border w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            jobs <sup>{stateTwo.jobs.length}+</sup>
          </h1>
        </div>
      </div>
    </div>
  );
}
