import React from "react";
import { LuMenu } from "react-icons/lu";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Navbar() {
  // const [user , setUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  const loginPage = Boolean(user);
  const channelPage = Boolean(user?.user?.channels.length > 0);
  // console.log(user.user.channels);
    // const viewChannelPage = Boolean(user);

  async function handleLogout() {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
      console.log(result.data);
      window.location.reload();
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  }

  //  function create (){
  //    axios.post("http://localhost:3000/api/channels",{    "channelName": "Code with aryan",
  //   "videos": ["6886939f86fd3cf3b64d00fa"],
  //   "description": "Coding tutorials and tech reviews by John Doe.",
  //   "channelBanner": "https://example.com/banners/john_banner.png",
  //   "subscribers": 5200
  // }, {
  //   withCredentials: true
  // })
  // .then((result) => {
  //   console.log(result.data);
  // })
  // .catch((err) => {
  //   console.error("Fetch error:", err.response?.data || err.message);

  // })
  //  }
  //  create()

  return (
    <>
      <div className="flex justify-between py-3 px-6 bg-white">
        <div className="flex  items-center ">
          <div className="mr-3 cursor-pointer">
            <LuMenu className="text-2xl " />
          </div>
          <div className="cursor-pointer">
            <img src={logo} alt="logo" className="w-28" />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="outline-none border border-gray-300 p-2 px-4 font-semibold rounded-l-3xl w-[40vw]"
          />
          <button className="bg-gray-100 p-2 px-4 rounded-r-3xl outline-none border border-gray-300">
            <CiSearch className="text-2xl " />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
        {
          !channelPage?( <Link to="/chennel">
             <button className="flex items-center gap-2 bg-gray-100 py-1.5 px-3 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
            Create chennel
          </button>
         </Link>):( <Link to="/chennel">
             <button className="flex items-center gap-2 bg-gray-100 py-1.5 px-3 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
            View chennel
          </button>
         </Link>)
        }
          {!loginPage ? (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-gray-100 pr-2.5 rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  className=" h-9 rounded-full"
                  alt=""
                />{" "}
                Login
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                className="flex text-red-700 pr-2.5 items-center gap-2 bg-gray-100  rounded-3xl outline-none border border-gray-300  font-semibold cursor-pointer hover:bg-gray-200"
                onClick={handleLogout}
              >
                <img
                  src={user.user.avatar}
                  className=" h-9 rounded-full"
                  alt=""
                />{" "}
                LogOut
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
