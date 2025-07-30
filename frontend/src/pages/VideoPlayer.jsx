import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Video() {
  const videos = useSelector((state) => state.user.userInput);
  const user = useSelector((state) => state.user.user)||JSON.parse(localStorage.getItem("user"));;
  console.log(user?.user);

  const { videoId } = useParams();

  const video = videos.find((video) => video._id === videoId);
  console.log(video);
  return (
    <>
      <div className="mt-16 flex">
        <div className="w-[64%] ml-7 mt-2.5   h-[100vh]">
          <div>
            <video controls width="100%"  className="rounded-lg  shadow-lg">
              <source src={video?.videoUrl} type="video/mp4"  />
            </video>
          </div>
          <div>
            <h2 className="font-bold text-[18px] mt-2 line-clamp-2">{video?.title}</h2>
          </div>
          <div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-1">{video?.description}</p>
            <p className="text-gray-600 text-sm">{video?.views || "0"} views   | {video?.uploadDate}</p>
          </div>
          <div className="md:flex mt-2 justify-between   items-center ">
            <div className="flex  items-center justify-between mr-5 md:mr-0 xsm:gap-0.5  gap-3 md:gap-5 md:mb-0  mb-4">
              <div className="flex items-center xsm:gap-1 gap-3 xsm:pr-0 pr-3.5">
                <div className="h-11 w-11 rounded-full  bg-gray-700">
                  <img
                    src={video?.uploader?.avatar}
                    className="rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex    md:gap-0 md:flex-col">
                  <h3 className="text-md  font-semibold">
                    {" "}
                    {video?.channelId?.channelName || video?.uploader?.username}
                  </h3>
                  <p className="font-semibold text-gray-600 ml-1  text-sm">
                    {" "}
                    {video?.channelId?.subscribers} subscribers
                  </p>
                </div>
              </div>
              <div className="bg-black hover:bg-gray-700 cursor-pointer md:ml-3 ml-9 xsm:ml-0.5 font-semibold text-white px-4 py-1.5 rounded-3xl">
                subscribe
              </div>
            </div>
            <div className="flex xsm:overflow-x-scroll md:overflow-x-hidden  xsm:hide-scroll-bar gap-2 text-md">
              <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 flex justify-center items-center font-semibold text-sm px-3 py-1.5 rounded-3xl">
                <AiOutlineLike className="text-xl mr-1.5" />{" "}
                <span> {video?.likes} | </span>{" "}
                <span className="ml-1.5"> {video?.dislikes} </span>
                <AiOutlineDislike className="text-xl  mx-1.5" />
              </div>
              <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 font-semibold px-4 py-1.5 rounded-3xl flex justify-center items-center  gap-2">
                <PiShareFatLight className="text-xl" /> Share
              </div>
              <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 font-semibold px-3 py-1.5 rounded-3xl flex justify-center items-center  gap-2">
                <LiaDownloadSolid className="text-xl" />
                Downlode
              </div>
              <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 font-semibold px-3 py-1.5 rounded-3xl items-center flex">
                {" "}
                <BsThreeDots className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-xl mt-2 ">526 Comments</h2>
            <div className="flex gap-2 items-center mt-4">
              <div className="h-11 w-11 rounded-full  bg-gray-700">
                <img
                  src={user?.user?.avatar}
                  className="rounded-full"
                  alt=""
                />
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="border-2  border-white border-b-gray-300 outline-none  px-4 py-1.5 w-[80%]"
              />
              <button className="bg-black hover:bg-gray-700 cursor-pointer font-semibold text-white px-4 py-1.5 rounded-3xl">Comment</button>
            </div>
            <div>f ef</div>

          </div>
        </div>
        <div className="w-[34%] bg-amber-500 h-[100vh]"></div>
      </div>
    </>
  );
}

export default Video;
