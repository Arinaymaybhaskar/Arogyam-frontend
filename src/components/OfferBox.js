import styled from "@emotion/styled";
import React from "react";
import { FcOk } from "react-icons/fc";
import Link from "next/link";

const OfferBox = () => {
  return (
    <>
      <div className="flex content-center items-center flex-col w-96 bg-lightMode-component text-lightMode-txt dark:bg-darkMode-component dark:text-darkMode-txt shadow-md m-4 p-4 gap-2">
        <div className="w-full flex content-center items-center p-1">
          <div className="w-full flex content-center items-center">
            <img
              className="w-[3rem] h-[3rem] rounded-full"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="img"
            />
            <span className="ml-4 text-xl font-medium text-teal-500">
              Ankur Yadav
            </span>
          </div>
          <span className="text-center font-bold text-green-500 text-3xl">
            $200
          </span>
        </div>
        <div className="text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi quidem
          consectetur magni soluta eveniet deserunt possimus aliquam molestias
          sapiente alias corporis, quis nesciunt ipsa quisquam totam? Est natus
          inventore vel.
        </div>
        <div className="flex content-center items-center">
          <div className="w-fit text-xl flex content-center items-center hover:text-gray-500 cursor-pointer">
            <Link href="/patient/checkout">
              <span className=" text-xl pl-2">
                <button className="text-md p-3 w-full font-medium bg-teal-700 rounded-xl text-white ">
                  {" "}
                  Accept
                </button>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferBox;
