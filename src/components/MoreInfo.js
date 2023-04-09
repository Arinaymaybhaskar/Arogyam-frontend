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
                        className="appearance-none block w-full bg-neutral-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
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
                            className="appearance-none block w-full bg-neutral-200 py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                            type="link"
                        // {...formik.getFieldProps("linkdin")}
                        />
                    </div>

                    <div className="flex flex-row m-4 border-[1px] border-black rounded-sm">
                        <label className=" uppercase m-2 flex items-center justify-center h-auto text-xl font-bold mb-2">
                            <AiOutlineTwitter />
                        </label>
                        <input
                            className="appearance-none block w-full bg-neutral-200  py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                            id="grid-password"
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
                        className="appearance-none block w-full bg-neutral-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500"
                        id="grid-password"
                        type="password"
                        placeholder="******************"
                        {...formik.getFieldProps("password")}
                    />
                    
                </div>
            </div>
            <div className="flex flex-row  mx-7 justify-center">
                <button
                    type="submit"
                    className="text-sm p-2 w-1/2 font-medium bg-lightMode-btn rounded-md m-5 text-white"
                >
                    Update Profile
                </button>
            </div>
        </form>
    );
}
export default MoreInfo;