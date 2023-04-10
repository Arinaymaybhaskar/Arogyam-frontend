import styled from "@emotion/styled";
import React from "react";
import { MdDelete } from "react-icons/md";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";

const CurrentPost = ({ post }) => {
  console.log(post.images);
  const { data: session } = useSession();
  console.log(post.image);
  return (
    <>
      <div className="w-2/3 flex content-center items-center flex-col bg-lightMode-component text-lightMode-txt dark:bg-darkMode-component dark:text-darkMode-txt shadow-xl h-fit p-4 gap-4 rounded-lg min-w-1/2">
        <div className="flex content-center items-center w-full">
          <div className="w-full flex flex-row content-center items-center">
            <img
              className="w-[3rem] h-[3rem] rounded-full"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="img"
            />
            {/* <span className="ml-4 text-2xl font-bold">{session.user.name}</span> */}
            {post.severity}
          </div>
          <span className="text-center text-3xl hover:text-red-600 cursor-pointer">
            <MdDelete />
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <p className="text-md text-justify">{post.description}</p>
          <img className="max-w-1/2 h-auto p-5" src={post.images} alt="" />
        </div>
      </div>
    </>
  );
};

export default CurrentPost;
