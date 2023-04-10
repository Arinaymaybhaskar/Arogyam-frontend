import React from "react";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const result = await axios.post("http://localhost:3000/api/user", {
    email: session.user.email,
  });
  const user = result.data.data;

  return {
    props: { session, user },
  };
}

const Profile = ({ user }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, fullname, contact } = formik.values;
    if (password === "") {
      toast.error("Password cannot be empty.", toastOptions);
      return false;
    } else if (fullname.length < 3) {
      toast.error(
        "Fullname should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (contact.length !== 10) {
      toast.error("Invalid Contact", toastOptions);
      return false;
    }
    return true;
  };

  const onSubmit = async (values, error) => {
    if (handleValidation()) {
      const { fullname, password, dob, gender, contact } = values;
      const res = await axios.post(`/api/user/${user._id}`, {
        fullname,
        password,
        dob,
        gender,
        contact,
      });

      if (res.status === 200) toast.info(res.data.msg);
      else toast.error(res.data.msg);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: user.fullname,
      password: "",
      dob: user.dob,
      gender: user.gender,
      contact: user.contact,
    },
    onSubmit,
  });

  return (
    <>
      <MainLayout>
        <div className=" h-full bg-lightMode-background dark:bg-darkMode-background flex flex-wrap flex-row  items-start p-5 justify-center font-sans text-lightMode-txt dark:text-darkMode-txt overflow-scroll">
          <div className="flex flex-col mt-8 w-[20rem] m-4">
            <div className=" p-5 mb-0 bg-lightMode-componentHead pl-5  rounded-t-md pb-1 w-auto  dark:bg-darkMode-componentHead">
              <h1 className="font-bold text-2xl">
                Your{" "}
                <span className="text-cyan-800 dark:text-cyan-600">
                  Profile
                </span>
              </h1>
            </div>
            <div className="mt-0  rounded-md border-slate-950 flex flex-col bg-lightMode-component dark:bg-darkMode-component items-center justify-center text-lightMode-txt dark:text-darkMode-txt w-auto rounded-t-none p-5">
              <div className="flex justify-center mb-3 p-3 pb-0">
                <img
                  className="rounded-full h-auto border-[1px] border-slate-600"
                  src="https://pbs.twimg.com/profile_images/1316055876466290690/27XA54-D.jpg"
                  alt="Profile photo"
                />
              </div>

              <div className="font-bold m-4 mt-0 text-2xl">{user.fullname}</div>

              <div className="text-sm p-4 py-2 w-40 font-medium text-white bg-lightMode-btn dark:bg-darkMode-btn rounded-md ">
                <input
                  id="photo"
                  type="file"
                  className="absolute left-0 w-40 h-full opacity-0"
                />
                Upload New Photo
              </div>
            </div>
          </div>

          <div className="m-8 rounded-md bg-lightMode-component dark:bg-darkMode-component dark:text-darkMode-txt text-lightMode-txt w-1/3 min-w-[20rem] h-4/5 overflow-y-scroll scrollbar-hide ">
            <div className="p-5 bg-lightMode-componentHead dark:bg-darkMode-componentHead rounded-t-md pb-1">
              <h1 className="font-bold text-2xl">Edit Profile</h1>
            </div>
            <form
              className="w-full p-5"
              action=""
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-xs font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
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
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
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
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
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
                    className="appearance-none block w-full bg-neutral-200 mb-3 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    type="password"
                    placeholder="**************"
                    {...formik.getFieldProps("password")}
                  />
                  {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p> */}
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
                      className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                      id="grid-state"
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
              <div className="flex flex-row mx-7 justify-center">
                <button
                  type="submit"
                  className="text-sm p-2 w-full font-medium bg-lightMode-btn dark:bg-darkMode-btn rounded-md m-5 text-white"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
      <ToastContainer />
    </>
  );
};

export default Profile;
