import Link from "next/link";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = ({ isDoctor }) => {
  const { data: session } = useSession();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  const basePath = true ? "/" : "/doctor/";

  return (
    <>
      <nav className="sticky top-0 bg-stone-100 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="text-cyan-600 md:order-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <span className="ml-2 text-2xl">AROGYAM</span>
          </div>
          <div className="order-3 w-full md:w-auto md:order-2">
            <ul className="text-xl flex justify-around">
              <li className="md:px-2 md:py-2 hover:text-cyan-600">
                <Link href={basePath}>Home</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-cyan-600">
                <Link href={`${basePath}profile`}>Profile</Link>
              </li>
              {!isDoctor ? (
                <>
                  {" "}
                  <li className="md:px-4 md:py-2 hover:text-cyan-600">
                    <Link href="/doctor/consult">Consult</Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="order-2 md:order-3">
            <button
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-gray-50 rounded-xl flex items-center gap-2"
              onClick={handleSignOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

//

export default Navbar;
