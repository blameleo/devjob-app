import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/JobSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "users"));
      // console.log(data);

      const filteredUsers = data.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });

      console.log(filteredUsers);
      dispatch(getUsers(filteredUsers));
      // setData(filteredUsers);
    };

    fetchData();
  }, []);
  const state = useSelector((state) => {
    return state.users;
  });

  const stateTwo = useSelector((state) => {
    return state.jobs;
  });

  return (
    <div>
      <div className="flex">
        <div className="m-5 flex justify-center items-center w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            users{" "}
            <sup>{state.users?.length ? `${state.users.length}+` : null}</sup>
          </h1>
        </div>
        <div className="m-5 flex justify-center items-center border w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            jobs{" "}
            <sup>{state.jobs?.length ? `${state.jobs.length}+` : null}</sup>
          </h1>
        </div>
      </div>
    </div>
  );
}
