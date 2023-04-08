import Navbar from "@/components/Navbar";
import React from "react";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden flex flex-col">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default MainLayout;
