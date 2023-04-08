import React from "react";
import MainLayout from "@/layouts/MainLayout";
import styled from "@emotion/styled";
import Navbar from "@/components/Navbar";
import { getSession } from "next-auth/react";
import {
  AiOutlineLink,
  AiFillYoutube,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/Ai";
import axios from "axios";
import { useFormik } from "formik";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const result = await axios.post("http://localhost:3000/api/patient", {
    email: session.user.email,
  });
  const user = result.data.data;
  return {
    props: { session, user },
  };
}

const DocProfile = ({ user }) => {
  const handleValidation = () => {
    return true;
  };

  const onSubmit = async (values, err) => {
    if (handleValidation()) {
      const {
        fullname,
        dob,
        qualification,
        contact,
        password,
        gender,
        linkdin,
        twitter,
      } = values;

      const { data } = await axios.post(`/api/patient/${user._id}`, {
        fullname,
        dob,
        contact,
        password,
        gender,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "user.fullname",
      dob: "user.dob",
      // qualification:"",
      contact: "user.contact",
      password: "***************",
      gender: "user.gender",
      // linkdin:"",
      // twitter:"",
    },
    onSubmit,
  });

  return (
    <div className="">
      <Navbar />
      <div className="bg-neutral-700 flex flex-row items-start p-5 justify-center font-sans h-screen">
        <div className="flex flex-col mt-4">
          <div className="m-4 mb-0 p-5 bg-neutral-900 pl-5 text-white rounded-t-xl pb-1 w-auto text-center ">
            <h1 className="font-bold text-2xl">{user.fullname}</h1>
          </div>
          <div className="m-4 mt-0 p-10 rounded-2xl border-slate-950 flex flex-col bg-neutral-800 items-center justify-center w-auto rounded-t-none">
            <div className="relative p-5">
              <img
                className="rounded-full w-40 h-auto bg-auto"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="Profile photo"
              />
            </div>
            <div className="font-bold m-4 mt-0 text-slate-200">
              @{user.fullname}
            </div>

            <div>
              <button className="text-md p-4 w-auto font-medium bg-teal-700 rounded-xl text-white">
                Upload New Photo
              </button>
            </div>
          </div>
        </div>

        <div className="m-8 rounded-xl bg-neutral-800 text-indigo-400 w-1/3 h-[685px] overflow-y-scroll scrollbar-hidden scrollbar-none">
          <div className="p-5 bg-neutral-900 pl-5 text-white rounded-t-xl pb-1">
            <h1 className="font-bold text-2xl">Edit Profile</h1>
          </div>
          <div className="p-12 pb-0">
            <form className="w-full max-w-lg " onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Full Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-700"
                    id="grid-first-name"
                    type="text"
                    {...formik.getFieldProps("fullname")}
                  />
                  <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Date of birth
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight placeholder:text-neutral-300 focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                    id="date-of-birth"
                    type="date"
                    {...formik.getFieldProps("dob")}
                  />
                </div>
              </div>
              {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    // {...formik.getFieldProps("email")}
                  />
                </div>
              </div> */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Qualifications
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                    id="grid-qualifications"
                    type="text"
                    placeholder="College name, Degree..."
                    // {...formik.getFieldProps("qualification")}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Contact Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                    id="grid-qualifications"
                    type="number"
                    placeholder="0000000000"
                    {...formik.getFieldProps("contact")}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                    {...formik.getFieldProps("password")}
                  />
                </div>
              </div>
              {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div> */}
              <div className="flex flex-wrap -mx-3 mb-9">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-state"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-neutral-700 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      id="grid-state"
                      {...formik.getFieldProps("gender")}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Transgender</option>
                      <option>Rather not say</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-neutral-100 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Social Accounts
                  </label>

                  <div className="flex flex-row m-4">
                    <label className="block uppercase m-2 content-center h-auto text-neutral-200 text-5xl font-bold mb-2">
                      <AiFillLinkedin />
                    </label>
                    <input
                      className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                      type="link"
                      // {...formik.getFieldProps("linkdin")}
                    />
                  </div>

                  <div className="flex flex-row m-4">
                    <label className="block uppercase m-2 content-center h-auto text-neutral-200 text-5xl font-bold mb-2">
                      <AiOutlineTwitter />
                    </label>
                    <input
                      className="appearance-none block w-full bg-neutral-700 text-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                      id="grid-password"
                      type="link"
                      // {...formik.getFieldProps("twitter")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-5 mx-7">
                <button
                  type="submit"
                  className="text-md p-4 w-full font-medium bg-teal-700 rounded-xl text-white m-5"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocProfile;
