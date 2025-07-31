import React, { useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";

function Video() {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [togle, setTogle] = useState(false);
  const [allVideos, setAllVideos] = useState([]);

  const videos = useSelector((state) => state.user.userInput);
  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("user"));
  // console.log(user?.user);

  const { videoId } = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/videos/`, {
      withCredentials: true,
    }).then((response) => {
      setAllVideos(response?.data?.allVideos);
    }).catch((error) => {
      console.error(
        "Error fetching comments:",
        error.response?.data || error.message
      );
    })
  },[])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/comments/${videoId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setComments(response?.data?.allComments);
      })
      .catch((error) => {
        console.error(
          "Error fetching comments:",
          error.response?.data || error.message
        );
      });
  }, [videoId, togle]);

  async function handleComment(e) {
    e.preventDefault();
    if (commentInput === "") {
      toast.error("Please enter a comment");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comments",
        { text: commentInput, videoId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setTogle(!togle);
      setCommentInput("");
      toast.success("Comment added successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add comment";
      toast.error(errorMessage);
    }
  }

  const video = videos.find((video) => video._id === videoId);

  function handleEdit(comment) {
    setCommentInput(comment.text);
    handleDelete(comment._id);
  }

  function handleDelete(commentId) {
    axios
      .delete(`http://localhost:3000/api/comments/${commentId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTogle(!togle);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to delete comment";
        toast.error(errorMessage);
      });
  }

  return (
    <>
      <div className="mt-16  flex pb-23">
        <div className="w-[64%] ml-7 mt-2.5   h-[100vh]">
          <div>
            <video controls width="100%" className="rounded-lg  shadow-lg">
              <source src={video?.videoUrl} type="video/mp4" />
            </video>
          </div>
          <div>
            <h2 className="font-bold text-[18px] mt-2 line-clamp-2">
              {video?.title}
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-1">
              {video?.description}
            </p>
            <p className="text-gray-600 text-sm">
              {video?.views || "0"} views | {video?.uploadDate}
            </p>
          </div>
          <div className="md:flex mt-2 justify-between   items-center ">
            <div className="flex  items-center justify-between mr-5 md:mr-0 xsm:gap-0.5  gap-3 md:gap-5 md:mb-0  mb-4">
              <div className="flex items-center xsm:gap-1 w-[100%] gap-3 xsm:pr-0 ">
                <div className="h-11 w-11 rounded-full  bg-gray-700">
                  <img
                    src={video?.uploader?.avatar}
                    className="rounded-full w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="flex  md:gap-0 md:flex-col">
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
            <div className="flex xsm:overflow-x-scroll  md:overflow-x-hidden  xsm:hide-scroll-bar gap-2 text-md">
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
            <h2 className="font-bold text-xl mt-2 ">
              {comments?.length} Comments
            </h2>
            <div className="flex gap-2 items-center mt-4">
              <div className="h-11 w-11 rounded-full ">
                {user?.user?.avatar ? (
                  <img
                    src={user?.user?.avatar}
                    className="rounded-full"
                    alt=""
                  />
                ) : (
                  <FaRegCircleUser className="text-4xl text-blue-700" />
                )}
              </div>
              <div className="flex  w-[100%]">
                <input
                  type="text"
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                  placeholder="Add a comment..."
                  className="border-2  border-white border-b-gray-300 outline-none  px-4 py-1.5 w-[84%]"
                />
                <button
                  onClick={handleComment}
                  className="bg-black hover:bg-gray-700 cursor-pointer font-semibold text-white px-4 py-1.5 rounded-3xl"
                >
                  Comment
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {comments?.map((comment) => (
                <div>
                  {comment?.user._id == user?.user?._id ? (
                    <div key={comment?._id} className="mt-4 w-[100%]">
                      <div className="flex">
                        <div className="flex gap-2 items-center w-[85%]">
                          <div className="h-11 w-11 rounded-full   bg-gray-100">
                            <img
                              src={comment?.user?.avatar}
                              className="w-full h-full rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col w-[100%]">
                            <div>
                              <h3 className="font-semibold text-sm">
                                @{comment?.user?.username} |{" "}
                                <span className="text-gray-500 text-sm">
                                  {comment?.timestamp
                                    .split("T")[0]
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </span>
                              </h3>
                              <p className="text-md text-gray-500 line-clamp-2">
                                {comment?.text}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => handleEdit(comment)}
                            className="flex cursor-pointer hover:scale-105  justify-center items-center text-md text-[blue]"
                          >
                            <FiEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment?._id)}
                            className="flex cursor-pointer hover:scale-105 items-center text-md text-[red]"
                          >
                            <AiOutlineDelete /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={comment?._id} className="mt-4 w-[100%]">
                      <div className="flex">
                        <div className="flex gap-2 items-center w-[95%]">
                          <div className="h-11 w-11 rounded-full   bg-gray-100">
                            <img
                              src={comment?.user?.avatar}
                              className="rounded-full w-full h-full"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col w-[100%]">
                            <div>
                              <h3 className="font-semibold text-sm">
                                @{comment?.user?.username} |{" "}
                                <span className="text-gray-500 text-sm">
                                  {comment?.timestamp
                                    .split("T")[0]
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </span>
                              </h3>
                              <p className="text-md text-gray-500 line-clamp-2">
                                {comment?.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[34%] mt-2.5 pl-6 flex flex-col gap-3 overflow-y-scroll  max-h-[150vh]">
          {allVideos?.map((video) => (
            <Link to={`/video/${video?._id}`}>
              <div key={video?._id} className="flex  gap-3">
                <div className="w-[42%]  h-[16vh]">
                  <img
                    src={video?.thumbnailUrl}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="w-[60%]">
                  <h2 className="text-md line-clamp-2 font-semibold">
                    {video?.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {video?.channelId?.channelName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {video?.views} views |{" "}
                    {video?.uploadDate
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Video;
