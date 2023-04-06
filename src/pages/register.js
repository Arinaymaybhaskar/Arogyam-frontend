import AuthLayout from "@/layouts/AuthLayout";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  // const router = useRouter();

  // const toastOptions = {
  //   position: "bottom-right",
  //   autoClose: 8000,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: "dark",
  // };

  // const handleValidation = () => {
  // const { password, confirmPassword, username, email } = values;
  // if (password !== confirmPassword) {
  //   toast.error(
  //     "Password and confirm password should be same.",
  //     toastOptions
  //   );
  //   return false;
  // } else if (username.length < 3) {
  //   toast.error(
  //     "Username should be greater than 3 characters.",
  //     toastOptions
  //   );
  //   return false;
  // } else if (password.length < 8) {
  //   toast.error(
  //     "Password should be equal or greater than 8 characters.",
  //     toastOptions
  //   );
  //   return false;
  // } else if (email === "") {
  //   toast.error("Email is required.", toastOptions);
  //   return false;
  // }
  // return true;
  // };

  // const onSubmit = async (values, error) => {
  //   if (handleValidation()) {
  //     const { email, username, password } = values;
  //     const { data } = await axios.post("/api/auth/signup", {
  //       username,
  //       email,
  //       password,
  //     });

  //     if (data.status === false) {
  //       console.log(data.msg);
  //       toast.error(data.msg, toastOptions);
  //     }

  //     if (data.status === true) {
  //       router.push("/");
  //     }
  //   }
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   onSubmit,
  // });

  return (
    <>
      <section className="bg-gray-50 dark:bg-neutral-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            AROGYAM
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a <span className="text-teal-700">new</span> Account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-black rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className=" text-gray-500 dark:text-gray-400">Sign in as a <span className="text-blue-400">doctor</span>.</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-red-500 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default Register;
