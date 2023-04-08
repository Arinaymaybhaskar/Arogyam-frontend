import styled from "@emotion/styled";
import React from "react";

const Array = [
  "Ankur Yadav",
  "Anime ",
  "Anuj Boricha",
  "Ankur",
  "Arinaymay Bhaskar",
  "Anuj",
  "Ankur",
  "Anime",
  "Anuj",
  "Ankur",
];

const TrendingBox = () => {
  return (
    <>
      <div className="w-96 flex flex-col p-4 gap-4 shadow-xl bg-stone-100">
        <div className="w-full flex content-center items-center p-2 rounded-md text-3xl text-teal-600">
          Trending Specialist
        </div>
        {Array.map((name, index) => {
          return (
            <>
              <div
                key={index}
                className="w-full flex items-center border-teal-950 gap-4 text-xl"
              >
                <span>{index + 1}</span>
                <span key={index} className="">
                  {name}
                </span>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TrendingBox;
