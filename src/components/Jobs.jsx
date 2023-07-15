import React, { useEffect, useState } from "react";
import data from "../data.json";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [searchResults, setSearchResults] = useState([]);
  const state = useSelector((state) => {
    return state.jobs;
  });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 min-h-screen  w-10/12 mx-auto  ">
      {state.jobs?.map((job, index) => {
        return <Job key={index} data={job} />;
      })}
    </div>
  );
};

export default Jobs;
