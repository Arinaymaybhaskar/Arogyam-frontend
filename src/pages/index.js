import React, { useState } from "react";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
import OfferBox from "@/components/OfferBox";
import CurrentPost from "@/components/CurrentPost";
import TrendingBox from "@/components/TrendingBox";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { FaSort } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  let res = await axios.post("http://localhost:3000/api/user", {
    email: session.user.email,
  });
  const user = res.data.data;

  //all posts by current user
  res = await axios.get(`http://localhost:3000/api/user/post/${user._id}`);
  const posts = res.data.data;

  let consultations = [];
  // all consultation offers on current post
  if (posts[0]) {
    res = await axios.get(
      `http://localhost:3000/api/user/doctor/consultation/toPost/${posts[0]._id}`
    );
    consultations = res.data.data;
  }

  return {
    props: { user, posts, consultations },
  };
}

const Home = ({ user, posts, consultations }) => {
  const [image, setImage] = useState(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const onSubmit = async (values, error) => {
    const body = new FormData();
    body.append("file", image);
    body.append("id", user._id);

    console.log(image.name);

    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    const { description, severity } = values;
    const res = await axios.post("/api/user/post", {
      patientId: user._id,
      description,
      severity,
      image: `/uploads/${user._id + image.name}`,
    });

    if (res.status === 200) {
      toast.info(res.data.msg);
      refreshData();
    }
  };

  const formik = useFormik({
    initialValues: {
      description: "Enter your thoughts/condition",
      severity: "low",
    },
    onSubmit,
  });
  return (
    <>
      <MainLayout>
        <div className="w-full h-full flex justify-around items-start overflow-x-hidden p-5 gap-10 text-lightMode-txt dark:text-darkMode-txt bg-lightMode-background dark:bg-darkMode-background">
          <div className="w-[75%] flex flex-col gap-5 p-5 pt-0">
            {posts[0] && !posts[0].solved ? (
              <>
                <CurrentPost
                  post={posts[0]}
                  refreshData={refreshData}
                  user={user}
                />
                <div className="w-full flex gap-8 items-center ">
                  <div className=" text-xl font-bold tracking-tight leading-tight flex flex-row">
                    <FaSort className="mx-2 cursor-pointer" />
                    Sort By
                  </div>
                  <div className=" text-xl font-bold tracking-tight leading-tight">
                    15 OFFERS
                  </div>
                </div>

                <div className="flex flex-row flex-wrap justify-start">
                  {consultations.map((consultation, index) => {
                    return (
                      <OfferBox
                        consultation={consultation}
                        key={consultation._id}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="w-full flex items-center flex-col text-lightMode-txt dark:text-darkMode-txt bg-lightMode-component dark:bg-darkMode-component shadow-md p-4 gap-4 rounded-lg">
                <div className="flex content-center items-center w-full">
                  <div className="w-full flex flex-row content-center items-center">
                    <img
                      className="w-[3rem] h-[3rem] rounded-full"
                      src={user.profile}
                      alt="img"
                    />
                    <span className="ml-4 text-2xl font-bold">
                      {user.fullname}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 w-[16vw]">
                    <label
                      className="block uppercase tracking-wide text-xs font-semibold mb-2"
                      htmlFor="grid-state"
                    >
                      Severity
                    </label>
                    <select
                      className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                      id="grid-state"
                      {...formik.getFieldProps("gender")}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </span>
                </div>
                <form
                  className="w-full flex flex-col gap-2 text-sm"
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
                      className="border-0 border-black p-1 w-72"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />

                    <button
                      className="font-medium bg-lightMode-btn dark:bg-darkMode-btn hover:bg-cyan-600 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-md px-12 p-2"
                      type="submit"
                      disabled={!formik.values.description.trim()}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="w-[25%] flex sticky top-0">
            <TrendingBox />
          </div>
        </div>
      </MainLayout>
      <ToastContainer />
    </>
  );
};

export default Home;
