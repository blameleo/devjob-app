import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Tabs({ icon, text, link }) {
  return (
    <Link to={link}>
      <div className="flex  items-center text-lg py-3 w-full pl-5 hover:bg-violet-200">
        <span className="mr-3"> {icon}</span>
        {text}
      </div>
    </Link>
  );
}
