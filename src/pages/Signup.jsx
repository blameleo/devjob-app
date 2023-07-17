import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
// import { addUser } from "../redux/JobSlice";
import { addUser } from "../redux/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast("user created succesfully");

  const initialValues = {
    type: "individual",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Sorry,invalid format here.")
      .required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const { createUser, user } = UserAuth();

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    resetForm();
    setError("");

    try {
      await createUser(values.email, values.password);
      //  console.log(user);
      notify();
      dispatch(addUser(values));
      setInfo("user created succesfully");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-200">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-bold text-gray-900 dark:text-black"
        >
          Devjobs
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col  h-[500px] justify-between">
                  <div>
                    <ToastContainer />
                    <label htmlFor="underline_select" className="sr-only">
                      Underline select
                    </label>
                    <Field
                      name="type"
                      as="select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option value="individual">looking for work</option>
                      <option value="employer">looking to employ</option>
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your first name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name"
                    />
                    {errors.email && touched.email ? (
                      <span className="text-red-500 text-[12px]">
                        {errors.email}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your last name
                      </label>
                      <Field
                        type="lastName"
                        name="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name"
                      />
                      {errors.email && touched.email ? (
                        <span className="text-red-500 text-[12px]">
                          {errors.email}
                        </span>
                      ) : null}
                    </div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@email.com"
                    />
                    {errors.email && touched.email ? (
                      <span className="text-red-500 text-[12px]">
                        {errors.email}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    {errors.password && touched.password ? (
                      <span className="text-red-500 text-[12px]">
                        {errors.password}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <span className="text-red-500 text-[12px]">
                        {errors.confirmPassword}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="hover:bg-light_primary bg-primary p-3 rounded-lg font-semibold text-white "
                    >
                      Sign up
                    </button>
                  </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login">
                      <button
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign In
                      </button>
                    </Link>
                  </p>
                  {error ? (
                    <span className="text-red-500 text-center text-[12px]">
                      {error}
                    </span>
                  ) : null}
                  <p className="text-center text-green-500">{info}</p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
