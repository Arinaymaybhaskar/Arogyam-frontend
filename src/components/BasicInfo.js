import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const BasicInfo = ({ doctor, image }) => {
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
    } else if (contact.length < 10) {
      toast.error("Invalid Contact", toastOptions);
      return false;
    }
    return true;
  };

  const onSubmit = async (values, err) => {
    if (handleValidation()) {
      const body = new FormData();
      body.append("file", image);
      body.append("id", doctor._id);

      console.log(image.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const { fullname, dob, contact, password, gender } = values;

      const res = await axios.post(`/api/user/${doctor._id}`, {
        fullname,
        dob,
        contact,
        password,
        gender,
        profile: `/uploads/${doctor._id + image.name}`,
      });

      if (res.status === 200) toast.info(res.data.msg);
      else toast.error(res.data.msg);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: doctor.fullname,
      dob: doctor.dob,
      contact: doctor.contact,
      password: "***************",
      gender: doctor.gender,
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
            className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
            id="grid-first-name"
            type="text"
            placeholder="Full name"
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
            className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
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
            className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
            id="grid-qualifications"
            type="number"
            placeholder="XXXXXXXXXX"
            {...formik.getFieldProps("contact")}
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
              className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
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
            className="appearance-none block w-full bg-neutral-200 mb-3 border-[1px] dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
            id="grid-password"
            type="password"
            placeholder="******************"
            {...formik.getFieldProps("password")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
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
  );
};
export default BasicInfo;
