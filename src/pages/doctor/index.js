import Navbar from "@/components/Navbar";
import RequestBox from "@/components/RequestBox";
import React, { useState, useEffect } from "react";

import { getSession, useSession } from "next-auth/react";
import styled from "@emotion/styled";
import Link from "next/link";
// import "react-toastify/dist/ReactToastify.css";
import TrendingBox from "@/components/TrendingBox";
import MainLayout from "@/layouts/MainLayout";

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

  // //current user
  // const result = await axios.post("http://localhost:3000/api/patient", {
  //   email: session.user.email,
  // });
  // const user = result.data.data;

  // if (user.isDoctor) {
  //   return {
  //     redirect: {
  //       destination: "/doctor",
  //       permanent: false,
  //     },
  //   };
  // }

  // //all posts by current user
  // const response = await axios.get(
  //   `http://localhost:3000/api/patient/post/${user._id}`
  // );
  // const posts = response.data.data;

  // let consultations = [];
  // //all consultation offers on current post
  // if (posts[0]) {
  //   const res = await axios.get(
  //     `http://localhost:3000/api/doctor/consultation/topatient/${posts[0]._id}`
  //   );
  //   consultations = res.data.data;
  // }

  return {
    props: { session },
  };
}

const Home = ({}) => {
  return (
    <>
      <MainLayout>
        <div className="w-full h-full flex content-center items-center gap-8 p-8 overflow-x-hidden bg-stone-200">
          <div className="h-full shadow-xl bg-neutral-900 w-[40%] p-4 rounded-xl flex flex-col content-center">
            <div className="flex content-center items-center flex-col gap-2 p-2 border-b-[1px] border-white">
              <img
                className="mt-5 w-[18rem] h-[18rem] rounded-full object-cover"
                src="https://i.redd.it/i3lr0r2xqt861.jpg"
                alt=""
              />
              <span className="text-4xl font-bold text-white">Full name</span>
            </div>
            <div className="px-4 gap-4 flex content-center items-center flex-col border-b-[1px] border-white text-white p-5">
              <div className="flex flex-row items-center">
                <div className="font-semibold text-2xl mr-2">Requests</div>
                <div className="font-semibold text-2xl text-teal-700">10</div>
              </div>
              <div className="flex flex-row items-center">
                <div className="text-2xl font-semibold mr-2">Accepted</div>
                <div className="font-semibold text-2xl text-teal-700">7</div>
              </div>
            </div>
            <div className="px-4 text-center flex content-center items-center text-white">
              <button
                className="w-full h-full mt-7 text-teal-950 font-bold -tracking-tightest leading-tight text-lg bg-slate-300
              "
              >
                Manage Consultations
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <RequestBox />
            <RequestBox />
            <RequestBox />
          </div>
          <TrendingBox />
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
