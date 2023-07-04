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

import { addJob, getJobs } from "../../redux/JobSlice";
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

export default function EditJob({ modalopen, handleFetchJobs, handleClose }) {
  const dispatch = useDispatch();
  const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    logoUrl: "",
    logoBackground: "#6590D5",
    website: "",
    description: "",
    requirements: {
      content: "",
      items: [],
    },
    role: {
      content: "",
      items: [],
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          dispatch(addJob({ ...formData, logoUrl: url }));
          handleFetchJobs();
        });
      }
    );
    console.log(formData);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     company: "",
  //     position: "",
  //     location: "",
  //     logoBackground: "#6590D5",
  //     website: "",
  //     description: "",
  //     requirements: {
  //       content: "",
  //       items: [],
  //     },
  //     role: {
  //       content: "",
  //       items: [],
  //     },
  //   },
  // onSubmit: (values, { resetForm }) => {
  //   setImageUrl("");
  //   const newVals = { ...values, logoUrl: imageUrl, image: imageUpload.name };
  //   dispatch(addJob(newVals));
  //   // handleUpload();

  //   handleFetchJobs();
  //   handleClose();
  //   resetForm();

  //   console.log(newVals);
  //   console.log(imageUrl);
  // },
  // });

  return (
    <Modal
      open={modalopen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="text-white text-center text-xl font-bold">Edit a job</h1>
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
              id="company"
              onChange={(e) => handleChange(e)}
              value={formData.company}
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
              value={formData.position}
            />
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
              value={formData.location}
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="location"
              required=""
            />
          </div>
          ç
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
              value={formData.description}
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
          {/* <div>
              <label
                htmlFor="logoBackground"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose your logo background color
              </label>
              <input
                type="color"
                name="logoBackground"
                value={formik.values.logoBackground}
                id="logoBackground"
                onChange={formik.handleChange("logoBackground")}
              />
            </div> */}
          {/* <div>
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
              value={formData.requirements.content}
              className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="requirement content"
              required=""
            />
          </div> */}
          <div>
            {/* <FieldArray
                type="text"
                name="requirements.items"
                render={(arrayHelpers) => (
                  <div>
                    <button
                      type="button"
                      className="text-white bg-primary px-2 mb-4 rounded-lg py-1 flex items-center"
                      onClick={() => arrayHelpers.push()}
                    >
                      click to add job requirements{" "}
                      <IoIosAddCircle className="ml-3" />
                    </button>
                    {formik.values.requirements.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <textarea
                          type="text"
                          name={`requirements.items[${i}]`}
                          value={formik.values.requirements.items[i]}
                          onChange={formik.handleChange}
                          className="bg-gray-50 border min-h-[10px]  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <IoIosRemoveCircle
                          type="button"
                          className="text-red-500 text-2xl cursor-pointer"
                          onClick={() => arrayHelpers.remove(i)}
                        />
                      </div>
                    ))}
                  </div>
                )}
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
                onChange={formik.handleChange}
                value={formik.values.role.content}
                className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="role content"
                required=""
              />
            </div>
            <div>
              <FieldArray
                type="text"
                name="role.items"
                render={(arrayHelpers) => (
                  <div>
                    <button
                      type="button"
                      className="text-white bg-primary px-2 mb-4 rounded-lg py-1 flex items-center"
                      onClick={() => arrayHelpers.push()}
                    >
                      click to add job roles <IoIosAddCircle className="ml-3" />
                    </button>
                    {formik.values.role.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <textarea
                          type="text"
                          name={`role.items[${i}]`}
                          value={formik.values.role.items[i]}
                          onChange={formik.handleChange}
                          className="bg-gray-50 border min-h-[10px]  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <IoIosRemoveCircle
                          type="button"
                          className="text-red-500 text-2xl cursor-pointer"
                          onClick={() => arrayHelpers.remove(i)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              /> */}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="hover:bg-light_primary bg-primary p-3 rounded-lg font-semibold text-white "
            >
              POST JOB
            </button>
          </div>
          <div className="flex justify-center"></div>
        </form>
        {/* </FormikProvider> */};{/* }} */}
        {/* </Formik> */}
      </Box>
    </Modal>
  );
}
