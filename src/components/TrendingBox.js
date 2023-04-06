import styled from "styled-components";
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
      <div className="w-1/3 flex flex-col p-4 gap-2 h-full shadow-xl bg-neutral-900 rounded-xl">
        <div className="w-full h-full flex content-center items-center shadow-xl p-4 rounded-md mb-3 font-bold leading-tight tracking-tight bg-teal-950 text-3xl text-teal-600" >Trending Specialist</div>
        {Array.map((name, index) => {
          return (
            <>
              <div className="w-full h-full flex items-center pl-4 shadow-xl border-teal-950 border-t-2 text-white text-2xl tracking-tight leading-tight font-semibold">
                <span className="">{name}</span>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};


export default TrendingBox;
