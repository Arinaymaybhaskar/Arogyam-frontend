import styled from "styled-components";
import React from "react";
import { FcHighPriority, FcShare, FcPlus, FcInspection } from "react-icons/fc";
import { BsClipboard2CheckFill } from "react-icons/bs";


const RequestBox = () => {
  return (
    <>
      <div className="flex content-center items-center flex-col w-full bg-neutral-900 shadow-xl mb-8 rounded-xl text-white ">
        <div className="flex content-center items-center w-full p-8 pb-2">
          <div className="flex items-center content-center w-full ">
            <img
              className="w-11 h-11 rounded-full"
              src="https://i.redd.it/i3lr0r2xqt861.jpg"
              alt="img"
            />
            <span className="pl-4 font-semibold tracking-tight text-lg leading-tight">Ankur Yadav</span>
          </div>
          <span className="text-center text-lg py-4 flex flex-row px-0" >
            <BsClipboard2CheckFill className="text-3xl text-neutral-700" />
            <FcHighPriority className="text-3xl mx-3 " />
          </span>
        </div>
        <div className="flex content-center items-center px-8 py-2 gap-2 w-full flex-col">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            quidem consectetur magni soluta eveniet deserunt possimus aliquam
            molestias sapiente alias corporis, quis nesciunt ipsa quisquam
            totam? Est natus inventore vel.
          </p>
          <img
            className="w-full h-full p-2"
            src="https://st2.depositphotos.com/1001599/7891/v/600/depositphotos_78913032-stock-illustration-patient-in-hospital-bed-being.jpg"
            alt=""
          />
        </div>
        <div className=" flex px-2 py-0 w-full gap-2">
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-600 cursor-pointer p-2 py-0">
            <span className="text-xl pl-2">
              <button className='text-md p-3 py-0 w-full rounded-xl text-white m-5 my-0 flex flex-row items-center font-bold tracking-tight leading-tight content-center'>
              <FcPlus className="text-2xl m-2" />
                Offer consultation
              </button>
            </span>
          </div>
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-600 cursor-pointer p-2">
            <span className="text-xl pl-2">
              <button className='text-md p-3 w-full font-bold tracking-tight leading-tight rounded-xl text-white m-5 my-0 flex flex-row items-center content-center'>
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
