import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import Addjobs from "../pages/Addjobs";
import { addJob } from "../../redux/JobSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 700,
  bgcolor: "black",
  border: "2px solid #000",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function FormModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      location: "",
      website: "",
      description: "",
      logo: "",
      requirements: {
        content: "",
        items: [],
      },
      role: {
        content: "",
        items: [],
      },
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(addJob(values));
      resetForm();
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="text-white text-center text-xl font-bold">Post a job</h1>
        {/* <Formik initialValues={initialValues} onSubmit={handleSubmit}> */}
        {/* {(formProps) => { */}
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 md:space-y-6 "
          action="#"
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
              onChange={formik.handleChange}
              value={formik.values.company}
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
              onChange={formik.handleChange}
              value={formik.values.position}
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
              onChange={formik.handleChange}
              value={formik.values.location}
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="location"
              required=""
            />
          </div>
          ç
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              type="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              id="text"
              className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="description"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              upload a logo
            </label>
            <input
              className=" w-full"
              type="file"
              name="logo"
              onChange={formik.handleChange("logo")}
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              requirement content
            </label>
            <textarea
              type="text"
              name="req-content"
              onChange={formik.handleChange}
              value={formik.values.location}
              id="req-content"
              className="bg-gray-50 border min-h-[100px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="requirement content"
              required=""
            />
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
        ;{/* }} */}
        {/* </Formik> */}
      </Box>
    </Modal>
  );
}
