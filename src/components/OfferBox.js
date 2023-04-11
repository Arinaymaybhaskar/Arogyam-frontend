import React from "react";
import Link from "next/link";

const OfferBox = ({ consultation }) => {
  console.log(consultation);
  return (
    <>
      <div className="flex content-center items-center flex-col w-96 bg-lightMode-component text-lightMode-txt dark:bg-darkMode-component dark:text-darkMode-txt shadow-md m-4 p-4 gap-2">
        <div className="w-full flex content-center items-center p-1">
          <div className="w-full flex content-center items-center">
            <img
              className="w-[3rem] h-[3rem] rounded-full"
              src={consultation.doctorId.profile}
              alt="img"
            />
            <span className="ml-4 text-xl font-medium text-teal-500">
              {consultation.doctorName}
            </span>
          </div>
          <span className="text-center font-bold text-green-500 text-3xl">
            ${consultation.fee}
          </span>
        </div>

        <div className="text-justify">
          <ul>Qualificaton - {consultation.doctorRefId.qualification}</ul>
          <ul>Experience - {consultation.doctorRefId.experience}</ul>
          <ul>Linkdin - {consultation.doctorRefId.linkdin}</ul>
          <ul>Twitter - {consultation.doctorRefId.twitter}</ul>
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
