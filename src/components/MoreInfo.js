import React from 'react';
import { getSession } from "next-auth/react";
import axios from "axios";
import { useFormik } from "formik";
import {
    AiOutlineLink,
    AiFillYoutube,
    AiFillLinkedin,
    AiOutlineTwitter,
  } from "react-icons/Ai";

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

const MoreInfo = () => {
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
          qualification:"",
          linkdin:"",
          twitter:"",
          experience:""
        },
        onSubmit,
      });
    return (
        <form className="w-full max-w-lg " onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide  text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        Qualifications
                    </label>
                    <input
                        className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                        id="grid-qualifications"
                        type="text"
                        placeholder="College name, Degree..."
                    // {...formik.getFieldProps("qualification")}
                    />
                </div>
            </div>
            
            <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        Social Accounts
                    </label>

                    <div className="flex flex-row m-4 border-[1px] border-black rounded-sm">
                    <label className=" uppercase m-2 flex items-center justify-center h-auto  text-xl font-bold mb-2">
                            <AiFillLinkedin />
                        </label>
                        <input
                            className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                            type="link"
                        // {...formik.getFieldProps("linkdin")}
                        />
                    </div>

                    <div className="flex flex-row m-4 border-[1px] border-black rounded-sm">
                        <label className=" uppercase m-2 flex items-center justify-center h-auto text-xl font-bold mb-2">
                            <AiOutlineTwitter />
                        </label>
                        <input
                            className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                            type="link"
                        // {...formik.getFieldProps("twitter")}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        Experience
                    </label>
                    <input
                        className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                        id="grid-password"
                        type="text"
                        placeholder="Experience"
                        {...formik.getFieldProps("experience")}
                    />
                    
                </div>
            </div>
            <div className="flex flex-row  mx-7 justify-center">
                <button
                    type="submit"
                    className="text-sm p-2 w-full font-medium bg-lightMode-btn dark:bg-darkMode-btn rounded-md m-5 text-white"
                >
                    Update Profile
                </button>
            </div>
        </form>
    );
}
export default MoreInfo;