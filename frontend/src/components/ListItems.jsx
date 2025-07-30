import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllVideos } from "../redux/userSlice";
import { toast } from "react-toastify";
import axios, { all } from "axios";
import { useState } from "react";
import { useEffect } from "react";

function ListItems() {
const allVideos = useSelector((state) => state.user.userInput||[]);
  const [videos, setVideos] = useState([]);
    const [toggle2, setToggle2] = useState(false);
// console.log(videos);
const dispatch = useDispatch();
console.log(allVideos);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/videos", { withCredentials: true })
      .then((result) => {
        setVideos(result.data.allVideos);
        console.log(result.data.allVideos);
      })
      .catch((err) => {
        console.error("Fetch error:", err.response?.data || err.message);
      });
  }, [toggle2]);


  const categories = [
    "All",
      "Education",
    "Entertainment",
    "Music",
    "Gaming",
    "Sports",
    "Technology",
    "News",
    "Travel",
    "Movies",
    "anime",
    "series",
  ];

function handleFilter(category) {
  console.log(category);

  if (category === 'All') {
    dispatch(setAllVideos(videos)); // Reset to all videos
    return;
  }

  const filteredVideos = videos.filter((video) => video.category === category);
  console.log(filteredVideos);

  if (filteredVideos.length > 0) {
    toast.success("Videos found for this category");
    dispatch(setAllVideos(filteredVideos));
  } else {
    toast.error("No videos found for this category");
    setToggle2((prev) => !prev);
    dispatch(setAllVideos(videos)); // fallback to all videos
  }
}

  return (
    <div id="main" className="myscrolbar  flex fixed z-50 bg-white md:left-[20%] right-0 overflow-x-scroll hide-scroll-bar px-1">
      <div className="flex space-x-3 flex-nowrap">
        {categories.map((category) => {
          return (
            <div onClick={() => {handleFilter(category)}}
              key={category}
              className=" flex-none bg-gray-100 hover:bg-gray-300 duration-300 rounded-xl px-4 py-1.5 font-semibold text-black cursor-pointer"
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListItems;
