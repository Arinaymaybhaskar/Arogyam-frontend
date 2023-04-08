import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdSort } from "react-icons/md";
import styled from "@emotion/styled";
import Link from "next/link";
import MainLayout from "@/layouts/MainLayout";
import OfferBox from "@/components/OfferBox";
import CurrentPost from "@/components/CurrentPost";
import TrendingBox from "@/components/TrendingBox";
import { getSession, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

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

  if (user.isDoctor) {
    return {
      redirect: {
        destination: "/doctor",
        permanent: false,
      },
    };
  }

  //all posts by current user
  const response = await axios.get(
    `http://localhost:3000/api/patient/post/${user._id}`
  );
  const posts = response.data.data;

  let consultations = [];
  //all consultation offers on current post
  if (posts[0]) {
    const res = await axios.get(
      `http://localhost:3000/api/doctor/consultation/topatient/${posts[0]._id}`
    );
    consultations = res.data.data;
  }

  return {
    props: { user, posts, consultations },
  };
}

const Home = ({ user, posts, consultations }) => {
  const [image, setImage] = useState(null);
  // const [id, setId] = useState("");
  const onSubmit = async (values, error) => {
    const body = new FormData();
    body.append("file", image);
    body.append("id", user._id);

    console.log(image.name);

    const response = await fetch("/api/upload", {
      method: "POST",
      body,
      // body: JSON.stringify({
      //   id: user._id,
      // }),
      // headers: {
      //   "Content-type": "application/json",
      // },
    });

    const { description, severity } = values;
    const { data } = await axios.post("/api/patient/post", {
      uid: user._id,
      description,
      severity,
      images: `/public/uploads/${user._id + image.name}`,
    });
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      severity: 0,
    },
    onSubmit,
  });
  return (
    <>
      <MainLayout>
        <div className="w-full h-full flex justify-around items-start overflow-x-hidden p-5 gap-10 bg-stone-200">
          <div className="w-2/3 flex flex-col gap-5 p-5 pt-0">
            {!posts[0].solved ? (
              <>
                <CurrentPost post={posts[0]} />
                <div className="w-full flex justify-around items-center text-white">
                  <div className="text-teal-500 text-xl font-bold tracking-tight leading-tight">
                    Sort By
                  </div>
                  <div className="text-teal-500 text-xl font-bold tracking-tight leading-tight">
                    15 OFFERS
                  </div>
                </div>

                <div className="flex flex-row flex-wrap justify-between">
                  <OfferBox />
                  <OfferBox />
                  <OfferBox />
                  <OfferBox />
                </div>
              </>
            ) : (
              <div className="w-full flex items-center flex-col bg-stone-100 shadow-xl h-fit p-4 gap-4">
                <div className="flex content-center items-center w-full">
                  <div className="w-full flex flex-row content-center items-center">
                    <img
                      className="w-[3rem] h-[3rem] rounded-full"
                      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt="img"
                    />
                    <span className="ml-4 text-2xl font-bold">Ankur Yadav</span>
                  </div>
                </div>
                <form
                  className="w-full flex flex-col gap-2"
                  onSubmit={formik.handleSubmit}
                >
                  <input
                    rows="8"
                    placeholder="Please, describe your health"
                    className="bg-transparent focus:outline-none border border-black rounded-md p-4"
                    {...formik.getFieldProps("description")}
                  />

                  <div className="w-full flex justify-between items-center px-2">
                    <input
                      type="file"
                      className="border border-black p-1 rounded-md w-72"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />

                    <span className="flex items-center gap-2">
                      <label htmlFor="severity" className="font-semibold">
                        Severity
                      </label>
                      <input
                        id="severity"
                        type="range"
                        min="0"
                        max="10"
                        className=""
                        {...formik.getFieldProps("severity")}
                      ></input>
                    </span>

                    <button
                      className="font-medium bg-cyan-700 hover:bg-cyan-600 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-md px-12 p-2"
                      type="submit"
                      // disabled={!input.trim() && !photoUrl.trim()}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <TrendingBox />
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
