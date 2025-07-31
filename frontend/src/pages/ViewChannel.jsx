import React from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewChannel() {

 


  const [videos, setVideos] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(videos);
  console.log(userData?.user);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/videos", { withCredentials: true })
      .then((result) => {
        setVideos(result?.data?.allVideos);
        console.log(result.data); // Uncomment for debugging
      })
      .catch((err) => {
        console.error("Fetch error:", err.response?.data || err.message);
      });
  }, []);

  const filteredVideos = videos.filter(
    (video) => video?.uploader?._id == userData?.user?._id
  );
  console.log(filteredVideos.length);
  return (
    <>
      <div className="flex mt-17 ">
        <div id="sidebar" className="w-[20vw] h-[100vh]">
          <Sidebar />
        </div>
        <div id="main" className="w-[80vw] h-[100vh]">
          <div className="w-full">
            <img
              src={userData?.user?.channels[0]?.channelBanner} // ← Use your uploaded banner URL or host locally
              alt="channel Banner"
              className="w-[99%] m-auto  rounded-2xl h-[170px] object-cover"
            />
          </div>
          <div className="px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={userData?.user?.avatar}
              alt="Zee TV Logo"
              className="w-30 h-30 rounded-full border"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">
                {userData?.user?.channels[0]?.channelName}{" "}
                <span className="text-black/60">✔</span>
              </h1>
              <p className="text-gray-600 text-sm">
                {userData?.user?.channels[0]?.subscribers}  subscribers ·{" "}
                {filteredVideos.length} videos
              </p>
              <p className="text-gray-700 text-sm max-w-xl mt-1">
                {userData?.user?.channels[0]?.description}
              </p>
              <button className="mt-2 px-4 py-1 cursor-pointer bg-black text-white rounded font-medium hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold px-4 py-2">Videos</h1>
            <div className="flex flex-wrap gap-1 py-2">
              {
                filteredVideos.map((video) => (
                  <Link to={`/video/${video._id}`}>
                   <div className=" w-66 p-1 shadow-sm rounded-lg">
                    <img
                      className="w-66 h-35 object-cover rounded-lg mb-2"
                      src={video.thumbnailUrl}
                      alt=""
                    />
                    <h2 className="text-[16px] font-semibold line-clamp-1">{video.title}</h2>
                    <p className="text-[#636262]  text-sm line-clamp-1">{video.description}</p>
                    <p className="text-[#636262] text-sm">
                      {video.views} views · {new Date(video.uploadDate).toLocaleString().split(",")[0]}
                    </p>
                  </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewChannel;
