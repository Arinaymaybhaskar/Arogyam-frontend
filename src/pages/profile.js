import React from "react";
import styled from "@emotion/styled";
import Navbar from "@/components/Navbar";
import { getSession } from "next-auth/react";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
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

  //current user
  const result = await axios.post("http://localhost:3000/api/patient", {
    email: session.user.email,
  });
  const user = result.data.data;

  return {
    props: { session, user },
  };
}

const Profile = ({ user }) => {
  const handleValidation = () => {
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
    return true;
  };

  const onSubmit = async (values, error) => {
    if (handleValidation()) {
      const { fullname, password, dob, gender, contact } = values;
      const { data } = await axios.post(`/api/patient/${user._id}`, {
        fullname,
        password,
        dob,
        gender,
        contact,
      });

      if (data.status === false) {
        console.log(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: user.fullname,
      password: "***********",
      dob: user.dob,
      gender: user.gender,
      contact: user.contact,
    },
    onSubmit,
  });

  return (
    <MainLayout>
      <div className="w-full h-full bg-stone-300 flex flex-row items-start p-8 gap-8 justify-center font-sans overflow-scroll overflow-x-hidden">
        <div className="w-1/5 flex flex-col h-fit">
          <div className=" bg-stone-100 rounded-t-md text-center p-3">
            <h1 className="font-bold text-2xl">{user.fullname}</h1>
          </div>
          <div className="rounded-md border-slate-950 flex flex-col bg-stone-200 items-center justify-center p-5">
            <div className="relative">
              <img
                className="rounded-full w-[10rem] h-[10rem] border-2 border-black"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="Profile photo"
              />
            </div>

            <div className="p-5">
              <div className="font-bold ">@{user.fullname}</div>
              <div className="font-bold ">@{user.fullname}</div>
              <div className="font-bold ">@{user.fullname}</div>
            </div>

            <div className="flex relative bg-cyan-600 px-4 p-2 text-white font-semibold">
              <input
                id="photo"
                type="file"
                className="absolute left-0 w-full h-full opacity-0"
              />
              Edit Pic
            </div>
          </div>
        </div>

        <div className="w-3/5 rounded-md bg-stone-200">
          <div className=" bg-stone-100 rounded-t-md text-left p-3 pl-8">
            <h1 className="font-bold text-2xl">Edit Profile</h1>
          </div>
          <form className="w-full p-5" action="" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-xs font-semibold mb-2">
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-stone-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-700"
                  type="text"
                  {...formik.getFieldProps("fullname")}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-xs font-semibold mb-2">
                  Date of birth
                </label>
                <input
                  className="appearance-none block w-full bg-stone-300 rounded py-3 px-4 leading-tight placeholder:text-neutral-300 focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                  type="date"
                  {...formik.getFieldProps("dob")}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-xs font-semibold mb-2">
                  Contact Number
                </label>
                <input
                  className="appearance-none block w-full bg-stone-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                  type="text"
                  placeholder="99xxxxxxxx"
                  {...formik.getFieldProps("contact")}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-xs font-semibold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-stone-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                  type="password"
                  placeholder="**************"
                  {...formik.getFieldProps("password")}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-semibold mb-2"
                  htmlFor="grid-state"
                >
                  Gender
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-stone-300 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                    {...formik.getFieldProps("gender")}
                  >
                    <option>Rather not say</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Transgender</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-md p-4 w-full font-medium bg-cyan-700 rounded-xl text-white"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
