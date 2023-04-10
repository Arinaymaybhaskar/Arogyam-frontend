import styled from "@emotion/styled";
import React from "react";
import { FcHighPriority, FcShare, FcPlus, FcInspection } from "react-icons/fc";
import { BsClipboard2CheckFill } from "react-icons/bs";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RequestBox = ({ post }) => {
  const { data, error, isLoading } = useSWR(
    `/api/patient/${post.uid}`,
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
              src="https://i.redd.it/i3lr0r2xqt861.jpg"
              alt="img"
            />
            <span className="pl-4 font-semibold tracking-tight text-lg leading-tight">
              {data.data.fullname}
            </span>
          </div>
          <span className="text-center text-lg py-4 flex flex-row px-0">
            Severity - {post.severity}
            {/* <BsClipboard2CheckFill className="text-3xl text-neutral-700" />
            <FcHighPriority className="text-3xl mx-3 " /> */}
          </span>
        </div>
        <div className="flex px-8 py-2 gap-2 w-full flex-col">
          <p>{post.description}</p>
          <img className="w-full h-full p-2" src={post.images} alt="" />
        </div>
        <div className=" flex px-2 py-0 w-full gap-2">
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-600 cursor-pointer p-2 py-0">
            <span className="text-xl pl-2">
              <button className="text-md p-3 py-0 w-full rounded-xl text-white m-5 my-0 flex flex-row items-center font-bold tracking-tight leading-tight content-center">
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
      </div>
    </>
  );
};

export default RequestBox;
