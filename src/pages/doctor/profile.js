import React from "react";
import MainLayout from "@/layouts/MainLayout";
import styled from "@emotion/styled";
import Navbar from "@/components/Navbar";
import BasicInfo from "@/components/BasicInfo";
import MoreInfo from "@/components/MoreInfo";
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

  const [info, setInfo] = React.useState("Basic");
  const BasicInformation = () => {
    setInfo("Basic");
  };
  const MoreInformation = () => {
    setInfo("More");
  }

  return (
    <MainLayout>
      
      <div className="bg-lightMode-background flex flex-row items-start p-5 justify-center font-sans h-full text-lightMode-txt" >
        <div className="flex flex-col mt-8 w-1/5 m-4">
          <div className=" p-5 mb-0 bg-lightMode-componentHead pl-5  rounded-t-md pb-1 w-auto text-center ">
            <h1 className="font-bold text-2xl">{user.fullname}</h1>
          </div>
          <div className=" mt-0  rounded-md border-slate-950 flex flex-col bg-lightMode-component items-center justify-center text-lightMode-txt w-auto rounded-t-none p-5">
            <div className=" flex justify-center mb-3 p-3 pb-0">
              <img
                className="rounded-full h-auto border-[1px] border-slate-600"
                src="https://pbs.twimg.com/profile_images/1316055876466290690/27XA54-D.jpg"
                alt="Profile photo"
              />
            </div>
            <div className="font-bold m-4 mt-0 ">
              {user.fullname}
            </div>

            <div>
              <button className="text-sm p-4 py-2 w-auto font-medium text-white bg-lightMode-btn rounded-md ">
                Upload New Photo
              </button>
            </div>
          </div>
        </div>

        <div className="m-8 rounded-md bg-lightMode-component text-lightMode-txt w-1/3 h-4/5 overflow-y-scroll scrollbar-hide " >
          <div className="p-5 bg-lightMode-componentHead rounded-t-md pb-1">
            <h1 className="font-bold text-2xl">Edit Profile</h1>
            <div className="flex flex-row justify-around items-center mt-2">
              <button className="w-full h-full active:underline rounded-sm" onClick={BasicInformation}>Basic Info</button>
              <button className="w-full h-full active:underline rounded-sm" onClick={MoreInformation}>More Info</button>
            </div>
          </div>
          <div className="p-8 pb-0 flex justify-center">
            {info === "Basic" && <BasicInfo/>}
            {info === "More" && <MoreInfo/>}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocProfile;
