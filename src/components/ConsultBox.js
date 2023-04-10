import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const ConsultBox = ({ post, doctor }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { fee, startTime, endTime } = formik.values;
    if (fee === "" || startTime === "" || endTime === "") {
      toast.error("Fields cannot be empty.", toastOptions);
      return false;
    }
    return true;
  };

  const onSubmit = async (values, err) => {
    if (handleValidation()) {
      const { fee, startTime, endTime } = values;

      const res = await axios.post("/api/user/doctor/consultation", {
        doctorId: doctor._id,
        postId: post._id,
        doctorName: doctor.fullname,
        fee,
        timeSlot: { startTime, endTime },
      });

      if (res.status === 200) toast.info(res.data.msg);
      else toast.error(res.data.msg);
    }
  };
  const formik = useFormik({
    initialValues: {
      fee: 0,
      startTime: "",
      endTime: "",
    },
    onSubmit,
  });
  return (
    <>
      <form className="w-full max-w-lg " onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-semibold mb-2"
              htmlFor="grid-first-name"
            >
              Fee
            </label>
            <input
              className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
              id="grid-first-name"
              type="text"
              placeholder="Full name"
              {...formik.getFieldProps("fee")}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Start Time
            </label>
            <input
              className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
              id="grid-qualifications"
              type="text"
              {...formik.getFieldProps("startTime")}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              End Time
            </label>
            <input
              className="appearance-none block w-full bg-neutral-200 mb-3 border-[1px] dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
              id="grid-password"
              type="text"
              {...formik.getFieldProps("endTime")}
            />
          </div>
        </div>

        <div className="flex flex-row mx-7 justify-center">
          <button
            type="submit"
            className="text-sm p-2 w-full font-medium bg-lightMode-btn dark:bg-darkMode-btn rounded-md m-5 text-white"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default ConsultBox;
