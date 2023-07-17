import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import FormModal from "../components/FormModal";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteJob } from "../../redux/JobSlice";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import EditJob from "../components/EditJob";

const jobsCollectionRef = collection(db, "jobs");

export default function Addjobs() {
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const state = useSelector((state) => {
    return state.jobs;
  });

  const dispatch = useDispatch();

  const getJobsList = async () => {
    try {
      const data = await getDocs(jobsCollectionRef);

      const filteredJobs = data.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          // logourl: imageUrl,
        };
      });

      dispatch(getJobs(filteredJobs));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobsList();
  }, []);

  const handleEditClick = (item) => {
    setSelectedJob(item);
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center">
        <Button
          event={handleOpen}
          style="hover:bg-light_primary ml-5  p-3 rounded-lg bg-violet-600 text-white  font-semibold text-primary "
          text="Post a job"
        />
      </div>
      {open && (
        <FormModal
          open={open}
          handleClose={handleClose}
          handleFetchJobs={getJobsList}
        />
      )}

      <div className=" grid place-items-center sm:grid-cols-2 md:grid-cols-4 gap-1 mt-5">
        {state.jobs?.map((item) => {
          const start = item.timestamp;
          const end = new Date();
          const timeDiff = end.getTime() - start;
          const seconds = Math.floor(timeDiff / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);

          const days = Math.floor(hours / 24);
          console.log(days);
          return (
            <div
              className="text-center  w-[250px] h-[300px] mb-10 bg-slate-100 rounded-lg p-2 py-4 shadow-lg"
              key={item.id}
            >
              <div className="">
                <div
                  style={{
                    backgroundColor: `${item.logoBackground}`,
                  }}
                  className="flex justify-center items-center border mx-auto   w-20 h-20 rounded-full"
                >
                  <img className="" src={item.logoUrl} alt="" />
                </div>

                <div>
                  <h1 className="font-bold py-2">{item.position}</h1>
                  <h1 className="">{item.company}</h1>
                </div>
              </div>
              <p className="text-sm py-2">{item.location}</p>

              <div className="flex justify-center my-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="hover:bg-light_primary bg-primary p-3 rounded-lg font-semibold text-white "
                >
                  edit
                </button>

                {selectedJob && (
                  <EditJob
                    modalopen={editModal}
                    handleFetchJobs={getJobsList}
                    handleClose={handleEditClose}
                    job={selectedJob}
                  />
                )}

                <button
                  onClick={() => {
                    dispatch(deleteJob(item.id));
                  }}
                  className="ml-3 hover:bg-light_primary bg-red-500 p-3 rounded-lg font-semibold text-white "
                >
                  delete
                </button>
              </div>
              <span className="text-sm text-gray-500 py-2">
                posted:{" "}
                {minutes < 60
                  ? `${minutes} mins ago`
                  : minutes >= 60 && minutes < 1440
                  ? `${Math.floor(minutes / 60)} hrs ago`
                  : `${Math.floor(minutes / 1440)} days ago`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
