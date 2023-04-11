import TrendingBox from "@/components/TrendingBox";
import MainLayout from "@/layouts/MainLayout";
import RequestBox from "@/components/RequestBox";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
  const doctor = res.data;

  //all posts
  res = await axios.get(`http://localhost:3000/api/user/post/`);
  const posts = res.data.data;

  return {
    props: { session, doctor, posts },
  };
}

const Home = ({ doctor, posts }) => {
  const { data: session } = useSession();
  return (
    <>
      <MainLayout>
        <div className="w-full h-full flex justify-center  gap-8 p-8 bg-lightMode-background dark:bg-darkMode-background text-lightMode-txt dark:text-darkMode-txt overflow-scroll">
          <div className="h-auto shadow-xl bg-neutral-900 w-1/5 p-4 rounded-lg flex flex-col content-center">
            <div className="flex content-center items-center flex-col gap-2 p-2 border-b-[1px] border-white">
              <img
                className="mt-5 p-8 w-auto h-auto rounded-full object-cover"
                src={doctor.data.profile}
                alt="pic"
              />
              <span className="text-4xl font-bold text-white">
                {doctor.data.fullname}
              </span>
            </div>
            <div className="px-4 gap-4 flex content-center items-center flex-col border-b-[1px] border-white text-white p-5">
              <div className="flex flex-row items-center">
                <div className="font-semibold text-2xl mr-2">Requests</div>
                <div className="font-semibold text-2xl text-teal-700">
                  {doctor.doctorData.requestCount}
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="text-2xl font-semibold mr-2">Accepted</div>
                <div className="font-semibold text-2xl text-teal-700">
                  {doctor.doctorData.consultCount}
                </div>
              </div>
            </div>
            <div className="px-4 text-center flex content-center items-center text-white">
              <Link href="/doctor/consult">
                <button
                  className="w-full h-full mt-7 text-teal-950 font-bold -tracking-tightest leading-tight text-lg bg-slate-300
                "
                >
                  Manage Consultations
                </button>
              </Link>
            </div>
          </div>
          <div className="w-2/5 h-full flex flex-col">
            {posts.map((post) => {
              return <RequestBox key={post._id} post={post} doctor={doctor} />;
            })}
          </div>
          <div className="w-1/4">
            <TrendingBox />
          </div>
        </div>
      </MainLayout>
      <ToastContainer />
    </>
  );
};

export default Home;
