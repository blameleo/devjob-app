import React, { useEffect, useState } from "react";
import data from "../data.json";
import Job from "./Job";
import { db } from "../firebase";
import {
  Query,
  QuerySnapshot,
  collection,
  onSnapshot,
} from "firebase/firestore";

const Jobs = ({ setJobs, setSearchResults, searchResults }) => {
  // useEffect(()=>{
  //   setJobs(data)
  //   setSearchResults(data)
  //     },[])

  useEffect(() => {
    const q = Query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let jobs = [];
      QuerySnapshot;
    });
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3   w-10/12 mx-auto  ">
      {searchResults.map((job, index) => {
        return <Job key={index} data={job} />;
      })}
    </div>
  );
};

export default Jobs;
