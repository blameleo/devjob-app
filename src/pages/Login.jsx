import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const { logIn } = UserAuth();

  const handleLogin = async (values, { resetForm }) => {
    setError("");
    try {
      await logIn(values.email, values.password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-100">
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
              Sign in to your account
            </h1>

            <Formik initialValues={initialValues} onSubmit={handleLogin}>
              <Form className="space-y-4 md:space-y-6" action="#">
                <div>
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
                    required=""
                  />
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
                </div>

                <div className="flex justify-center">
                  <button className="hover:bg-light_primary bg-primary p-3 rounded-lg font-semibold text-white ">
                    Log in
                  </button>
                </div>
                <div className="flex justify-center">
                  {error && (
                    <span className="text-center text-red-500 text-[12px]">
                      {error}
                    </span>
                  )}
                </div>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link to="/signup">
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </span>
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
