import React from "react";
import { LuMenu } from "react-icons/lu";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaRegCircleUser } from "react-icons/fa6";
import { setAllVideos } from "../redux/userSlice";
import { logout } from "../redux/userSlice";

function Navbar() {
  const [userInput, setUserInput] = useState("");
  const [videos, setVideos] = useState([]);
  const [toggle, setToggle] = useState(false);

  //to set all videos in redux
  const dispatch = useDispatch();
  dispatch(setAllVideos(videos));

  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("user"));

  const loginPage = Boolean(user);
  const channelPage = Boolean(user?.user?.channels.length > 0);
  console.log("user", user);


  //to handle logout
  async function handleLogout() {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      dispatch(logout());
      console.log(result.data);
      toast.success("User logout successfully");
      // window.location.replace("/");
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  }

  //to get all videos
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
  }, []);

  //to toggle menu
  function handleMenu() {
    const menu = document.getElementById("sidebar");
    const main = document.getElementById("main");
    if (!toggle) {
      main.style.width = "100vw";
    } else {
      main.style.width = "80vw";
    }
    setToggle(!toggle);
    menu.classList.toggle("hidden");
  }

  //to search
  function handleSearch() {
    if (userInput.trim() === "") {
      toast.error("Please enter something to search");
      return;
    }

    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(userInput.toLowerCase())
    );

    if (filteredVideos.length > 0) {
      toast.success("Videos found");
      setVideos(filteredVideos);
    } else {
      toast.error("No videos found");
    }
    setUserInput("");
  }

  return (
    <>
      <div className="flex fixed z-50 top-0 left-0 right-0 justify-between py-3 px-6 bg-white">
        <div className="flex  items-center ">
          <div onClick={handleMenu} className="mr-3 cursor-pointer">
            <LuMenu className="text-2xl " />
          </div>
          <div className="cursor-pointer">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-28" />
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            placeholder="Search"
            className="outline-none border border-gray-300 p-2 px-4 font-semibold rounded-l-3xl w-[40vw]"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-100 cursor-pointer p-2 px-4 rounded-r-3xl outline-none border border-gray-300"
          >
            <CiSearch className="text-2xl " />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <Link to={"/uploadvideo"}>
            <button className="flex items-center gap-2 bg-gray-100 py-1.5 px-3 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
              <FaUpload /> Video
            </button>
          </Link>
          {!channelPage ? (
            <Link to="/chennel">
              <button className="flex items-center gap-2 bg-gray-100 py-1.5 px-3 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
                Create chennel
              </button>
            </Link>
          ) : (
            <Link to="/viewchannel">
              <button className="flex items-center gap-2 bg-gray-100 py-1.5 px-3 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
                View chennel
              </button>
            </Link>
          )}
          {!loginPage ? (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-gray-100 py-[3px] text-blue-700 pr-2.5 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
                <FaRegCircleUser className="text-3xl text-blue-700" />
                Sign in
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                className="flex text-[red] pr-2.5 items-center gap-2 bg-gray-100  rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200"
                onClick={handleLogout}
              >
                <img
                  src={user.user.avatar}
                  className=" h-9 rounded-full"
                  alt=""
                />{" "}
                Log out
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
