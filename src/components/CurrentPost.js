import styled from "@emotion/styled";
import React from "react";
import { MdDelete } from "react-icons/md";

const CurrentPost = () => {
  return (
    <>
      <div className="flex content-center items-center flex-col ml-20 bg-neutral-900 rounded-xl shadow-xl text-white w-[50rem] h-[70rem]">
        <div className="flex content-center items-center w-full p-2">
          <div className="w-full flex flex-row p-4 content-center items-center">
            <img
            className="w-[3rem] h-[3rem] rounded-full"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="img"
            />
            <span className="ml-4 text-2xl font-bold leading-tight text-slate-300">Ankur Yadav</span>
          </div>
          <span className="text-center text-2xl px-1 py-4 hover:text-red-600 cursor-pointer">
            <MdDelete />
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full p-8 pt-2">
          <p className="text-lg font-medium">
             Quasi quidem
            consectetur magni soluta eveniet deserunt possimus aliquam molestias
            sapiente alias corporis, quis nesciunt ipsa quisquam totam? Est
            natus inventore vel. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Quasi quidem consectetur magni soluta eveniet
            deserunt possimus aliquam molestias sapiente alias corporis, quis
            nesciunt ipsa quisquam totam? Est natus inventore vel.
          </p>
          <img
          className="w-full h-[60vh] p-10 pt-5"
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};



export default CurrentPost;
