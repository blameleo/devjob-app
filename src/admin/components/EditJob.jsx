import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IoIosRemoveCircle, IoIosAddCircle } from "react-icons/io";
import Modal from "@mui/material/Modal";
// import { useFormik, FormikProvider, FieldArray, Formik } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import { editJob, getJobs } from "../../redux/JobSlice";
import { collection } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 700,
  bgcolor: "black",
  border: "2px solid #000",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function EditJob({
  modalopen,
  handleFetchJobs,
  handleClose,
  job,
  openEdit,
}) {
  const dispatch = useDispatch();
  const [imageUpload, setImageUpload] = useState("");
  const [progress, setProgress] = useState(0);

  const [newJob, setNewJob] = useState({
    company: job.company,
    position: job.position,
    location: job.location,
    logoUrl: job.logoUrl,
    contract: job.contract,
    logoBackground: "#6590D5",
    website: job.website,
    description: job.description,
    requirements: {
      content: job.requirements.content,
      items1: job.requirements.items1,
      items2: job.requirements.items2,
      items3: job.requirements.items3,
      items4: job.requirements.items4,
      items5: job.requirements.items5,
    },
    role: {
      content: job.role.content,
      items1: job.role.items1,
      items2: job.role.items2,
      items3: job.role.items3,
      items4: job.role.items4,
      items5: job.role.items5,
    },
  });

  const handleChange = (e) => {
    if (e.target.name.includes(".")) {
      const [parentProp, childProp] = e.target.name.split(".");

      setNewJob((prevFormData) => ({
        ...prevFormData,
        [parentProp]: {
          ...prevFormData[parentProp],
          [childProp]: e.target.value,
        },
      }));
    } else setNewJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${imageUpload.name}`);
    const uploadImage = uploadBytesResumable(storageRef, imageUpload);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          // const jobRef = collection(db, "jobs");
          handleClose();

          let updatedJob = {
            company: newJob.company,
            position: newJob.position,
            location: newJob.location,
            website: newJob.website,
            contract: newJob.contract,
            description: newJob.description,
            logoUrl: url,
            logoBackground: newJob.logoBackground,
            requirements: {
              content: newJob.requirements.content,
              items1: newJob.requirements.items1,
              items2: newJob.requirements.items2,
              items3: newJob.requirements.items3,
              items4: newJob.requirements.items4,
              items5: newJob.requirements.items5,
            },
            role: {
              content: newJob.role.content,
              items1: newJob.role.items1,
              items2: newJob.role.items2,
              items3: newJob.role.items3,
              items4: newJob.role.items4,
              items5: newJob.role.items5,
            },
            id: job.id,
          };
          dispatch(editJob({ id: job.id, updatedJob }));
          handleFetchJobs();
        });
      }
    );
  };
  return (
    <div>
      <Modal
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-white text-center text-xl font-bold">
            Edit a job
          </h1>
          {/* <Formik initialValues={initialValues} onSubmit={handleSubmit}> */}
          {/* {(formProps) => { */}
          {/* <FormikProvider value={formik}> */}
          <form
            className="space-y-4 md:space-y-6 "
            action="#"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                onChange={handleChange}
                value={newJob.company}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="company name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="position"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Position
              </label>
              <input
                type="text"
                name="position"
                id="position"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Position"
                required=""
                onChange={(e) => handleChange(e)}
                value={newJob.position}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contract" className="text-white">
                contract
              </label>
              <select name="contract" onChange={(e) => handleChange(e)} id="">
                <option value={newJob.contract}>Part Time</option>
                <option value={newJob.contract}>Full Time</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                location
              </label>
              <input
                type="location"
                name="location"
                onChange={(e) => handleChange(e)}
                value={newJob.location}
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="location"
                required=""
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                website
              </label>
              <input
                type="website"
                name="website"
                onChange={(e) => handleChange(e)}
                value={newJob.website}
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="location"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                type="text"
                onChange={(e) => handleChange(e)}
                value={newJob.description}
                name="description"
                id="description"
                className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="description"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="logo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                upload a logo
              </label>
              <input
                className=" w-full text-white"
                type="file"
                name="image"
                encType="multipart/form-data"
                onChange={(e) => handleUpload(e)}
              />
              <span className="text-white">{progress}</span>
            </div>
            <div>
              <label
                htmlFor="logoBackground"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose your logo background color
              </label>
              <input
                type="color"
                name="logoBackground"
                value={newJob.logoBackground}
                id="logoBackground"
                onChange={(e) => handleChange("logoBackground")}
              />
            </div>
            <div>
              <label
                htmlFor="requirements.content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                requirement content
              </label>
              <textarea
                type="text"
                name="requirements.content"
                onChange={(e) => handleChange(e)}
                value={newJob.requirements.content}
                className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="requirement content"
                required=""
              />
            </div>
            <div>
              <label className="text-white" htmlFor="">
                requirement items
              </label>
              <input
                type="text"
                name="requirements.items1"
                value={newJob.requirements.items1}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border my-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="requirements.items2"
                value={newJob.requirements.items2}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="requirements.items3"
                value={newJob.requirements.items3}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border my-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="requirements.items4"
                value={newJob.requirements.items4}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="requirements.items5"
                value={newJob.requirements.items5}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 my-1 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="role.content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                role content
              </label>
              <textarea
                type="text"
                name="role.content"
                onChange={(e) => handleChange(e)}
                value={newJob.role.content}
                className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="requirement content"
                required=""
              />
            </div>
            <div>
              <label className="text-white" htmlFor="">
                role items
              </label>
              <input
                type="text"
                name="role.items1"
                value={newJob.role.items1}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border my-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="role.items2"
                value={newJob.role.items2}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="role.items3"
                value={newJob.role.items3}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border my-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="role.items4"
                value={newJob.role.items4}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                name="role.items5"
                value={newJob.role.items5}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 my-1 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="hover:bg-light_primary bg-primary p-3 rounded-lg font-semibold text-white "
              >
                UPDATE JOB
              </button>
            </div>
            <div className="flex justify-center"></div>
          </form>
          {/* </FormikProvider> */};{/* }} */}
          {/* </Formik> */}
        </Box>
      </Modal>
    </div>
  );
}
