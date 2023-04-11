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
      <div className="flex items-center flex-col w-full bg-neutral-900 shadow-xl mb-8 rounded-xl text-white ">
        <div className="flex content-center items-center w-full p-4 pb-2">
          <div className="flex items-center content-center w-full ">
            <img
              className="w-11 h-11 rounded-full"
              src={data.data.profile}
              alt="img"
            />
            <span className="pl-4 font-semibold tracking-tight text-lg leading-tight">
              {data.data.fullname}
            </span>
          </div>
          <span className="text-center text-lg py-4 flex flex-row px-0">
            <FcHighPriority className="text-3xl mx-3 " /> Severity{" "}
            {post.severity}
          </span>
        </div>
        <div className="flex px-8 py-2 gap-2 w-full flex-col">
          <p>{post.description}</p>
          <img className="w-full h-full p-2" src={post.image} alt="" />
        </div>
        <div className=" flex px-2 py-0 w-full gap-2">
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-600 cursor-pointer p-2 py-0">
            <span className="text-xl pl-2">
              <button
                className="text-md p-3 py-0 w-full rounded-xl text-white m-5 my-0 flex flex-row items-center font-bold tracking-tight leading-tight content-center"
                onClick={() => setOffer(!offer)}
              >
                <FcPlus className="text-2xl m-2" />
                Offer consultation
              </button>
            </span>
          </div>
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-600 cursor-pointer p-2">
            <span className="text-xl pl-2">
              <button className="text-md p-3 w-full font-bold tracking-tight leading-tight rounded-xl text-white m-5 my-0 flex flex-row items-center content-center">
                <FcShare className="text-2xl m-2" />
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
