import React from "react";
import axios from "axios";
import { FcCancel } from "react-icons/fc";
import { getSession } from "next-auth/react";
import MainLayout from "@/layouts/MainLayout";
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
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  return (
    <MainLayout>
      <div className="h-full flex flex-wrap overflow-y-scroll scrollbar-thin p-8 gap-8 bg-lightMode-background dark:bg-darkMode-background text-lightMode-txt dark:text-darkMode-txt justify-center">
        {consultations.map((consultation) => {
          const handleRevoke = async () => {
            const res = await axios.delete(
              `/api/user/doctor/consultation/${consultation._id}`
            );
            // console.log(res);
            refreshData();
          };
          return (
            <>
              <div className="w-[25rem] flex content-center items-center bg-lightMode-component dark:bg-darkMode-component shadow-xl flex-col  rounded-lg">
                <div className="p-5 ">
                  <div className="w-full flex content-center items-center">
                    <div className="w-full content-center items-center flex flex-row">
                      <img
                        className="w-[2rem] h-[2rem] rounded-full "
                        src={consultation.postId.patientId.profile}
                        alt="img"
                      />
                      <span className="w-full p-[0.5rem] pl-4 font-medium -tracking-tight leading-tight">
                        {consultation.postId.patientId.fullname}
                      </span>
                    </div>
                    <span className="text-center text-lg py-4 flex flex-row px-0 text-green-400 dark:text-green-700">
                      {consultation.fee}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 border-b-[1px] border-b-black font-medium">
                    <p>{consultation.postId.description}</p>
                    <img
                      className="w-full h-[15rem]"
                      src={consultation.postId.image}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full bg-lightMode-componentHead dark:bg-darkMode-componentHead dark:text-darkMode-txt p-5 rounded-b-lg">
                  <div className="w-fit text-xl flex justify-center items-center dark:hover:text-cyan-300 hover:text-cyan-800 cursor-pointer">
                    <span className="text-lg ">
                      <button
                        className="text-md w-full  flex flex-row justify-evenly font-bold tracking-tight leading-tight"
                        onClick={handleRevoke}
                      >
                        <FcCancel className="text-2xl" />
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
