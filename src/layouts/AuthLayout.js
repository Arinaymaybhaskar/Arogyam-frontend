import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen flex  flex-nowrap content-center items-center bg-neutral-950">
        <div className="w-[45rem] h-3/4 flex content-center items-center drop-shadow-lg m-14">
          <img className="w-1/2 h-full" src="/authImage.jpg" alt="" />
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
