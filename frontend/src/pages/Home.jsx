import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useState } from "react";
import ListItems from "../components/ListItems";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";



function Home() {
 //fetch all videos from redux
const videos = useSelector((state) => state.user.userInput||[]);
console.log(videos);
 
  return (
    <>
      <div className="flex mt-17 ">
        <div id="sidebar" className="w-[20vw] h-[100vh]  ">
          <Sidebar />
        </div>
        <div id="main" className=" w-[80vw]  ">
          <ListItems />
          <div className="flex ml-3 flex-wrap mt-12  gap-4">
            {videos?.map((video) => (
             <Link to={`/video/${video?._id}`}>
                <div
                key={video?._id}
                className="rounded-xl h-[45vh] shadow-sm  w-[23vw] bg-amber-10  overflow-hidden"
              >
                <img
                  className="h-[28vh] w-full object-cover rounded-xl"
                  src={video?.thumbnailUrl}
                  alt="Video Thumbnail"
                />
                <div className="flex px-2 pt-2 gap-3">
                  <img
                    className="h-11 w-11 text-[#636262] rounded-full object-cover"
                    src={video?.uploader?.avatar}
                    alt=" Avatar"
                  />
                  <div className="flex flex-col leading-tight ">
                    <h3 className="font-semibold text-base md:text-[17px] leading-tight mb-1 line-clamp-2">
                      {video?.title}
                    </h3>
                    <p className="text-md text-[#636262] line-clamp-1">
                      {video?.channelId?.channelName ||
                        video?.uploader?.username}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {video?.views} views | {video?.uploadDate.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
             </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
