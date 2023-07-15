import React from "react";
import { ReactSVG } from "react-svg";
import { ThemeToggler } from "../context/ThemeContext";
import { Link } from "react-router-dom";
// import test from '../assets/logos/creative.svg'

const Job = ({ data }) => {
  const { darkMode } = ThemeToggler();
  // console.log(test);
  console.log(data);
  const start = data.timestamp;
  const end = new Date();
  const timeDiff = end.getTime() - start;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return (
    <div
      className={
        darkMode
          ? "bg-dark_blue m-3 rounded-xl  relative h-[250px] p-8 mb-10 "
          : "bg-white m-3 rounded-xl  h-[250px] relative  p-8 mb-10 "
      }
    >
      {/* <ReactSVG src={test}/> */}
      <div
        className=" absolute -top-6   flex justify-center w-14  items-center h-14 rounded-xl "
        style={{ backgroundColor: `${data.logoBackground}` }}
      >
        {/* <img className='border text-2xl' src={data.logo} alt="" /> */}
        <img src={data.logoUrl} />
      </div>
      <div className="flex pt-6 text-gray-500 w-40 justify-between ">
        <p>
          {minutes < 60
            ? `${minutes} mins ago`
            : minutes > 60
            ? `${hours} hr ago `
            : null}
        </p>
        <span className="font-black">.</span>
        <p>{data.contract}</p>
      </div>
      <Link to={`/jobdetails/${data.id}`}>
        <h1
          className={
            darkMode
              ? "py-2 font-bold text-xl text-white cursor-pointer hover:text-gray-500"
              : "py-2 font-bold text-xl cursor-pointer hover:text-gray-500"
          }
        >
          {data.position}
        </h1>
      </Link>
      <p className="pb-10 text-gray-500">{data.company}</p>

      <p className="text-primary font-semibold">{data.location}</p>
    </div>
  );
};

export default Job;
