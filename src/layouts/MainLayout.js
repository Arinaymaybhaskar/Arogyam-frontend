import Navbar from "@/components/Navbar";
import React from "react";
import { useSession } from "next-auth/react";

const MainLayout = ({ children }) => {
  const { data: session } = useSession();
  return (
    <>
      <div className="w-screen h-screen overflow-hidden flex flex-col">
        <Navbar isDoctor={session.user.isDoctor} />
        {children}
      </div>
    </>
  );
};

export default MainLayout;
