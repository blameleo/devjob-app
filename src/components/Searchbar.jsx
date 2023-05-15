import React, { useState } from "react";
import { MdFilterAlt, MdSearch } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { ThemeToggler } from "../context/ThemeContext";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";

function Searchbar({ jobs, setSearchResults }) {
  const { darkMode } = ThemeToggler();
  const [checked,setChecked] = useState(true)
  const [searchData, setSearchData] = useState({
    title: "",
    location: "",
    fullTime: "",
  });

  function handleChange(e) {
      setSearchData((prev)=>{
        return {
          ...prev,
          [e.target.name]: e.target.value,
        }
    })

  }

  function handleContract() {
    setChecked((prev)=>!prev)
    console.log(checked);
    setSearchData((prev)=>  {
      return {
        ...prev,
        fullTime: `${checked ? "Full Time": ""}`
      }
    })

  
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchData({
      title: "",
      location: "",
      fullTime: "",
    })
    if (searchData.title === "" && searchData.location === "" && searchData.fullTime==="") {
      console.log(searchData);
      return setSearchResults(jobs);
    } else {
      const resultsArray = jobs.filter(job =>{
        return job.position.includes(searchData.title) && job.location.includes(searchData.location) && job.contract.includes(searchData.fullTime )});
      setSearchResults(resultsArray);
      console.log(searchData);

    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        darkMode
          ? `bg-dark_blue mt-16 rounded-xl w-10/12 mx-auto h-16 flex items-center  text-black `
          : ` mt-16 rounded-xl w-10/12 mx-auto h-16 flex items-center bg-white text-black`
      }
    >
      <label
        htmlFor=""
        className={
          darkMode
            ? "w-8/12 sm:w-5/12 lg:w-6/12 flex items-center border-r-dark_gray    sm:border-r h-full"
            : "w-8/12 sm:w-5/12 lg:w-6/12 flex items-center     sm:border-r h-full"
        }
      >
        <MdSearch className="hidden sm:block text-3xl mx-2 text-primary" />
        <input
          type="text"
          value={searchData.title}
          onChange={handleChange}
          name="title"
          className={
            darkMode
              ? `bg-dark_blue w-full  h-full outline-none rounded-xl sm:pl-0 pl-10 text-white`
              : `w-full  h-full outline-none rounded-xl sm:pl-0 pl-10`
          }
          placeholder="Filter by title..."
        />
      </label>
      <label
        htmlFor=""
        className={
          darkMode
            ? "w-5/12 sm:flex hidden items-center  lg:w-4/12 border-r-dark_gray   border-r h-full"
            : "w-5/12 sm:flex hidden items-center  lg:w-4/12   border-r h-full"
        }
      >
        <MdLocationOn className="text-3xl mx-2 text-primary" />
        <input
          type="text"
          value={searchData.location}
          onChange={handleChange}
          name="location"
          className={
            darkMode
              ? "bg-dark_blue w-full h-full outline-none placeholder:truncate text-white"
              : "w-full h-full outline-none placeholder:truncate"
          }
          placeholder="Filter by location..."
        />
      </label>
      <div className="w-4/12   lg:w-4/12 flex justify-around items-center ">
        <div className="hidden sm:flex items-center">
          <input
            type="checkbox"
            name="fullTime"
            defaultValue={searchData.fullTime}
            onChange={handleContract}
            className="w-4 h-4 text-blue-600 bg-gray-500  rounded  "
          />{" "}
          {/* <Checkbox sx={{ baclcolor: pink[800] }} /> */}
          <span
            className={
              darkMode
                ? "pl-3 font-semibold sm:text-sm text-white"
                : "pl-3 font-semibold sm:text-sm"
            }
          >
            Full Time Only
          </span>
        </div>
        <button className="sm:hidden">
          <MdFilterAlt
            className={
              darkMode ? "text-3xl text-white" : "text-3xl text-gray-600"
            }
          />
        </button>
        <button className="hidden hover:bg-light_primary sm:block sm:w-24 bg-primary text-white py-3 rounded-lg">
          search
        </button>
        <button className="block sm:hidden hover:bg-light_primary  bg-primary text-white p-2 rounded-lg">
          <MdSearch className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
