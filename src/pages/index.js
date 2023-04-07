import React, { useState, useEffect } from "react";
import { MdSort } from 'react-icons/md';
import styled from "@emotion/styled";
import Link from "next/link";
// import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/layouts/MainLayout";
import OfferBox from "@/components/OfferBox";
import CurrentPost from "@/components/CurrentPost";
import TrendingBox from "@/components/TrendingBox";

const Home = ({ }) => {
  return (
    <>
      <MainLayout>
        
        <div className="h-screen flex content-evenly items-center overflow-x-hidden gap-8 p-8 bg-neutral-800">
          
          <div className="w-full h-full flex flex-col gap-8 ml-10">
            {true ? (
              <>
                 <CurrentPost />
                <div className="flex content-evenly items-center text-white">
                  <span className="text-teal-500 text-xl font-bold tracking-tight leading-tight pl-8">15 OFFERS</span>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <OfferBox />
                  <OfferBox />
                  <OfferBox />
                  <OfferBox />
                  
                </div>
              </>
            ) : (
              <div className="post"></div>
            )}
          </div>
          <TrendingBox key={1}/>
        </div>
      </MainLayout>
    </>
  );
};


export default Home;
