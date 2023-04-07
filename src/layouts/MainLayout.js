import Navbar from "@/components/Navbar";

import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-[100vh] overflow-x-hidden scrollbar-none flex flex-col">
        <Navbar />
        {/* <div className="h-full overflow-y-scroll scrollbar-none">{children}</div> */}
        {children}
      </div>
    </>
  );
};



export default MainLayout;
