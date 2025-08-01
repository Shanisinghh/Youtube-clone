import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useState } from "react";
import ListItems from "../components/ListItems";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  //fetch all videos from redux
  const videos = useSelector((state) => state.user.userInput || []);
  console.log(videos);

  return (
    <>
      <div className=" flex md:mt-17 mt-10 mdd:mt-12 ">
        <div id="sidebar" className="md:w-[20vw] mdd:w-[20vw] h-[100vh]  ">
          <Sidebar className="" />
        </div>
        <div id="main" className=" mdd:w-[100vw] md:w-[80vw]  ">
          <ListItems />
          <div className=" flex flex-wrap mt-3 mdd:gap-1 mdd:justify-center  md:gap-4">
            {videos?.map((video) => (
              <Link to={`/video/${video?._id}`}>
                <div
                  key={video?._id}
                  className="md:rounded-xl mdd:rounded-xl md:h-[40vh] mdd:h-[38vh] h-[45vh] shadow-sm xsm:w-[100vw] mdd:w-[49vw]  md:w-[323px] bg-amber-10  overflow-hidden"
                >
                  <img
                    className="h-[28vh] w-full object-cover  mdd:rounded-xl"
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
