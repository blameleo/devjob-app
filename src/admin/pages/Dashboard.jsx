import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getUsers } from "../../redux/JobSlice";
import { getUsers } from "../../redux/UserSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import CardBarChart from "../components/CardBarChart";

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

  console.log(stateTwo.jobs);

  return (
    <div>
      <div className="sm:flex justify-between">
        <div className="m-5 flex justify-center items-center w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            users{" "}
            <sup>{state.users?.length ? `${state.users.length}+` : null}</sup>
          </h1>
        </div>
        <div className="m-5 flex justify-center items-center border w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            jobs{" "}
            <sup>
              {stateTwo.jobs?.length ? `${stateTwo.jobs.length}+` : null}
            </sup>
          </h1>
        </div>

        <div className="m-5 flex justify-center items-center border w-[300px] shadow-xl  rounded-lg h-[150px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <h1 className="text-white font-bold text-[40px]">
            applications <sup>0</sup>
          </h1>
        </div>
      </div>
      {/* <div className="m-5   shadow-xl  rounded-lg h-[400px] bg-gradient-to-l from-green-200 via-blue-500 to-purple-300">
        <h1 className="text-white text-center font-bold">forex rates</h1>
      </div> */}
      <CardBarChart />
    </div>
  );
}
