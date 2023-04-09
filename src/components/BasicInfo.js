import React from 'react';
import { getSession } from "next-auth/react";
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

const BasicInfo = () => {
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
                        className="block uppercase tracking-wide text-xs font-semibold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Full Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-neutral-200 rounded py-3 px-4 leading-tight placeholder:text-neutral-300 focus:outline-none focus:bg-neutral-700 focus:border-gray-500 focus:text-white"
                        id="grid-first-name"
                        type="text"
                        {...formik.getFieldProps("fullname")}
                    />
                    
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        Date of birth
                    </label>
                    <input
                        className="appearance-none block w-full bg-neutral-200 rounded py-3 px-4 leading-tight placeholder:text-neutral-300 focus:outline-none focus:bg-neutral-700 focus:border-gray-500 focus:text-white"
                        id="date-of-birth"
                        type="date"
                        {...formik.getFieldProps("dob")}
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide  text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        Contact Number
                    </label>
                    <input
                        className="appearance-none block w-full bg-neutral-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-gray-500 focus:text-white"
                        id="grid-qualifications"
                        type="number"
                        placeholder="XXXXXXXXXX"
                        {...formik.getFieldProps("contact")}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-9">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-xs font-semibold mb-2"
                        htmlFor="grid-state"
                    >
                        Gender
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-neutral-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:text-white"
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
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        Password
                    </label>
                    <input
                        className="appearance-none block w-full bg-neutral-200 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-700 focus:text-white"
                        id="grid-password"
                        type="password"
                        placeholder="******************"
                        {...formik.getFieldProps("password")}
                    />
                    <p className="text-red-500 text-xs italic">
                        Please fill out this field.
                    </p>
                </div>
            </div>


            <div className="flex flex-row mx-7 justify-center">
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
export default BasicInfo;