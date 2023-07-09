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
      <FormModal
        open={open}
        handleClose={handleClose}
        handleFetchJobs={getJobsList}
      />

      <div className=" grid place-items-center sm:grid-cols-2 md:grid-cols-5 gap-1 mt-5">
        {state.jobs?.map((item) => {
          return (
            <div
              className="text-center border w-[200px] h-[260px] mb-10 bg-slate-100 rounded-lg p-2 py-4 shadow-lg"
              key={item.id}
            >
              <div className="">
                <div className="flex justify-center">
                  <img
                    style={{ backgroundColor: `${item.logoBackground}` }}
                    className="border border-black w-[100px] h-[100px] rounded-full"
                    src={item.logoUrl}
                    alt=""
                  />
                </div>

                <div>
                  <h1 className="font-bold">{item.position}</h1>
                  <h1>{item.company}</h1>
                </div>
              </div>
              <p>{item.location}</p>

              <div className="flex justify-center">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
