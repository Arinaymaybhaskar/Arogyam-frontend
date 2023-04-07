import Navbar from "@/components/Navbar";
import styled from "@emotion/styled";
import React from "react";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { FcHighPriority, FcShare, FcPlus, FcInspection } from "react-icons/fc";

const Array = ["Ankur", "Anime", "Anuj", "Ankur", "Anime", "Anuj", "Ankur"];

const selected = () => {
  return (
    <>
      <div className=" h-screen flex flex-col">
        <Navbar />
        {/* <div
          id="heading"
          className="p-20 pl-12 text-7xl font-bold -tracking-tightest leading-tight bg-neutral-900 text-white"
        >
          <p>
            Your <span className="text-teal-700">Consultations</span>
          </p>
        </div> */}

        <div className="h-full flex flex-wrap  overflow-y-scroll scrollbar-thin p-8 gap-8 bg-neutral-800">
          {Array.map((item, index) => {
            return (
              <>
                <div className="w-[25rem] flex content-center items-center bg-neutral-900 text-white shadow-xl flex-col  rounded-xl">
                  <div className="p-5 ">
                    <div className="w-full flex content-center items-center">
                      <div className="w-full content-center items-center flex flex-row">
                        <img
                          className="w-[2rem] h-[2rem] rounded-full "
                          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          alt="img"
                        />
                        <span className="w-full p-[0.5rem] pl-4 font-medium -tracking-tight leading-tight">
                          Ankur Yadav
                        </span>
                      </div>
                      <span className="text-center text-lg py-4 flex flex-row px-0">
                        $300
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 border-b-[1px] border-b-black font-medium">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quasi quidem consectetur magni soluta eveniet
                        deserunt possimus aliquam molestias sapiente alias
                        corporis, quis nesciunt ipsa quisquam totam? Est natus
                        inventore vel.
                      </p>
                      <img
                        className="w-full h-[15rem]"
                        src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex justify-center w-full bg-neutral-950 p-5 rounded-xl">
                    <div className="w-fit text-xl flex justify-center hover:text-gray-600 cursor-pointer">
                      <span className="text-lg ">
                        <button className="text-md w-full rounded-xl text-white flex flex-row font-bold tracking-tight leading-tight ">
                          <FcPlus className="text-2xl ml-4 " />
                          Revoke consultation
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default selected;
