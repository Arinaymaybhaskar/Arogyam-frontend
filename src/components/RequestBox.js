import React, { useState } from "react";
import { FcHighPriority, FcShare, FcPlus, FcInspection } from "react-icons/fc";
import useSWR from "swr";
import ConsultBox from "./ConsultBox";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RequestBox = ({ post, doctor }) => {
  const [offer, setOffer] = useState(false);
  const { data, error, isLoading } = useSWR(
    `/api/user/${post.patientId}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="flex items-center flex-col w-full bg-lightMode-component text-lightMode-txt shadow-xl mb-8 rounded-xl dark:bg-darkMode-component dark:text-darkMode-txt">
        <div className="flex  content-center items-center w-full p-4 pb-2">
          <div className="flex items-center content-center w-full ">
            <img
              className="w-11 h-11 rounded-full"
              src={data.data.profile}
              alt="img"
            />
            <span className="pl-4 text-md leading-tight font-sans">
              {data.data.fullname}
            </span>
          </div>
          <span className="text-center text-lg  flex flex-row pr-5 flex-wrap w-full justify-end">
             <span className="mr-2">
              Severity -{" "}
              </span> 
            <span className="uppercase font-sans font-medium">
            {post.severity}
            </span>
          </span>
        </div>
        <div className="flex px-8 gap-2 w-full flex-col ">
          <p className="font-sans">{post.description}</p>
          <img className="w-auto h-[300px] p-5 object-contain" src={post.image} alt="" />
        </div>
        <div className=" flex flex-wrap justify-around w-full gap-2">
          <div className="w-fit text-xl flex  content-center items-center hover:text-gray-600 cursor-pointer p-2 py-0">
            <span className="text-xl ">
              <button
                className="text-md  w-full rounded-xl  flex flex-row items-center font-bold tracking-tight leading-tight content-center"
                onClick={() => setOffer(!offer)}
              >
                <FcPlus className="text-2xl mr-2" />
                Offer consultation
              </button>
            </span>
          </div>
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-600 cursor-pointer ">
            <span className="text-xl ">
              <button className="text-md p-3 w-full font-bold tracking-tight leading-tight rounded-xl   flex flex-row items-center content-center">
                <FcShare className="text-2xl mr-2" />
                Share
              </button>
            </span>
          </div>
        </div>
        {offer && <ConsultBox post={post} doctor={doctor} />}
      </div>
    </>
  );
};

export default RequestBox;
