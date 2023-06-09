import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useSession } from "next-auth/react";

const CurrentPost = ({ user, post, refreshData }) => {
  const { data: session } = useSession();

  const handleDelete = async () => {
    const res = await axios.delete(`/api/user/post/delete/${post._id}`);
    console.log(res);
    refreshData();
  };

  return (
    <>
      <div className="w-full h-[50%] flex content-center items-center flex-col bg-lightMode-component text-lightMode-txt dark:bg-darkMode-component dark:text-darkMode-txt shadow-xl p-4 gap-4 rounded-lg min-w-1/2">
        <div className="flex content-center items-center w-full">
          <div className="w-full flex flex-row content-center items-center">
            <img
              className="w-[3rem] h-[3rem] rounded-full"
              src={user.profile}
              alt="img"
            />
            <span className="ml-4 text-2xl font-bold">{user.name}</span>
          </div>
          <span
            className="text-center text-3xl hover:text-red-600 cursor-pointer"
            onClick={handleDelete}
          >
            <MdDelete />
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <p className="text-md text-justify font-sans">{post.description}</p>
          <img className="w-auto h-[300px] p-5 object-contain" src={post.image} alt="" />
        </div>
      </div>
    </>
  );
};

export default CurrentPost;
