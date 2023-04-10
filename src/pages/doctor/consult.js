import React from "react";
import axios from "axios";
import { FcHighPriority, FcShare, FcPlus, FcInspection } from "react-icons/fc";
import { getSession } from "next-auth/react";
import MainLayout from "@/layouts/MainLayout";

const Array = ["Ankur", "Anime", "Anuj", "Ankur", "Anime", "Anuj", "Ankur"];

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
  const doctor = res.data.data;

  res = await axios.get(
    `http://localhost:3000/api/user/doctor/consultation/byDoctor/${doctor._id}`
  );
  let consultations = res.data.data;

  return {
    props: { session, doctor, consultations },
  };
}

const selected = ({ doctor, consultations }) => {
  return (
    <MainLayout>
      <div className="h-full flex flex-wrap overflow-y-scroll scrollbar-thin p-8 gap-8 bg-lightMode-background dark:bg-darkMode-background text-lightMode-txt dark:text-darkMode-txt justify-center">
        {consultations.map((consultation, index) => {
          return (
            <>
              <div className="w-[25rem] flex content-center items-center bg-lightMode-component dark:bg-darkMode-component shadow-xl flex-col  rounded-lg">
                <div className="p-5 ">
                  <div className="w-full flex content-center items-center">
                    <div className="w-full content-center items-center flex flex-row">
                      <img
                        className="w-[2rem] h-[2rem] rounded-full "
                        src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="img"
                      />
                      <span className="w-full p-[0.5rem] pl-4 font-medium -tracking-tight leading-tight">
                        {doctor.fullname}
                      </span>
                    </div>
                    <span className="text-center text-lg py-4 flex flex-row px-0 text-green-400 dark:text-green-700">
                      {consultation.fee}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 border-b-[1px] border-b-black font-medium">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quasi quidem consectetur magni soluta eveniet deserunt
                      possimus aliquam molestias sapiente alias corporis, quis
                      nesciunt ipsa quisquam totam? Est natus inventore vel.
                    </p>
                    <img
                      className="w-full h-[15rem]"
                      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full bg-lightMode-componentHead dark:bg-darkMode-componentHead dark:text-darkMode-txt p-5 rounded-b-lg">
                  <div className="w-fit text-xl flex justify-center items-center dark:hover:text-cyan-300 hover:text-cyan-800 cursor-pointer">
                    <span className="text-lg ">
                      <button className="text-md w-full  flex flex-row justify-evenly font-bold tracking-tight leading-tight ">
                        <FcPlus className="text-2xl" />
                        <p>Revoke consultation</p>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default selected;
