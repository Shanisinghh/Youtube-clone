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
  const { videoId } = useParams();
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentId, setCommentId] = useState("");

  //to fetch videos from redux
  const videos = useSelector((state) => state.user.userInput);
  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("user"));

  //to fetch all videos
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/videos/`, {
        withCredentials: true,
      })
      .then((response) => {
        setAllVideos(response?.data?.allVideos);
      })
      .catch((error) => {
        console.error(
          "Error fetching comments:",
          error.response?.data || error.message
        );
      });
  }, []);

  //to fetch comments based on video id
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

  //to add comments
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

  //handle edit comment
  function handleEdit(comment) {
    setCommentId(comment._id);
    setCommentInput(comment.text);
    setIsUpdateComment(true);
  }

  //handle update comment
  function handleUpdateComment() {
    console.log(commentId);
    axios
      .put(`http://localhost:3000/api/comments/${commentId}`, {
        text: commentInput,
      })
      .then((response) => {
        setTogle(!togle);
        setIsUpdateComment(false);
        toast.success("Comment updated successfully");
        setCommentInput("");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to update comment";
        toast.error(errorMessage);
      });
  }

  //handle delete comment
  function handleDelete(commentId) {
    axios
      .delete(`http://localhost:3000/api/comments/${commentId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTogle(!togle);
        toast.success("Comment deleted successfully");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to delete comment";
        toast.error(errorMessage);
      });
  }

  return (
    <>
      <div className="mdd:mt-16 mt-12 flex flex-col mdd:flex-row ">
        <div className=" mdd:w-[64%] w-[100%] mdd:ml-2.5 md:ml-7 mt-2.5   max-h-[130vh]">
          <div>
            <video controls width="100%" className="mdd:rounded-lg  shadow-lg">
              <source src={video?.videoUrl} type="video/mp4" />
            </video>
          </div>
          <div>
            <h2 className="font-bold mdd:text-[20px] text-[17px]  ml-1.5 md:ml-0 mt-2 line-clamp-2">
              {video?.title}
            </h2>
          </div>
          <div>
            <p className="text-gray-600 mdd:text-sm text-xs ml-1.5 md:ml-0 line-clamp-1">
              {video?.description}
            </p>
            <p className="text-gray-600 ml-1.5 md:ml-0 mdd:text-sm text-xs">
              {video?.views || "0"} views | {video?.uploadDate}
            </p>
          </div>
          <div className="md:flex mt-2 ml-1.5 md:ml-0 justify-between   items-center ">
            <div className="flex  items-center justify-between mr-5 md:mr-0 xsm:gap-0.5  gap-3 md:gap-5 md:mb-0  mb-4">
              <div className="flex items-center xsm:gap-1 w-[100%] gap-3 xsm:pr-0 ">
                <div className="h-11  w-11 rounded-full  bg-gray-300">
                  <img
                    src={video?.uploader?.avatar}
                    className="rounded-full w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="flex  md:gap-0 flex-col">
                  <h3 className="text-md  font-semibold">
                    {" "}
                    {video?.channelId?.channelName || video?.uploader?.username}
                  </h3>
                  <p className="font-semibold text-gray-600 ml-1 text-xs mdd:text-sm">
                    {" "}
                    {video?.channelId?.subscribers} subscribers
                  </p>
                </div>
              </div>
              <div className="bg-black hover:bg-gray-700 cursor-pointer text-xs md:text-base md:ml-3 ml-9 xsm:ml-0.5 font-semibold text-white px-4 mdd:py-1.5 py-1 rounded-3xl">
                subscribe
              </div>
            </div>
            <div className="myscrolbar flex xsm:overflow-x-scroll h-7 mdd:h-9 md:overflow-x-hidden  xsm:hide-scroll-bar gap-2 text-xs mdd:text-base">
              <div className="bg-gray-100 cursor-pointer flex justify-center items-center font-semibold text-xs  mdd:text-base py-1.5 rounded-3xl">
                <span className="flex items-center hover:bg-gray-200 h-9 rounded-l-3xl px-2 ">
                  <AiOutlineLike className="text-xl " />{" "}
                  <span className="mx-1.5"> {video?.likes} </span>{" "}
                </span>
                |
                <span className="flex items-center hover:bg-gray-200 h-9 rounded-r-3xl px-2">
                  {" "}
                  <span className="mx-1.5">{video?.dislikes}</span>
                  <AiOutlineDislike className="text-xl  " />
                </span>
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
          <div className="mt-4 ml-1.5 md:ml-0">
            <h2 className="font-bold mdd:text-xl text-md  mt-2 ">
              {comments?.length} Comments
            </h2>
            <div className="flex mdd:gap-2 gap-1 items-center mt-4">
              <div className="h-11 w-11 rounded-full ">
                {user?.user?.avatar ? (
                  <img
                    src={user?.user?.avatar}
                    className="rounded-full bg-gray-300"
                    alt=""
                  />
                ) : (
                  <FaRegCircleUser className="text-4xl text-blue-700" />
                )}
              </div>
              <div className="flex h-6 mdd:h-7 md:h-9 w-[100%]">
                <input
                  type="text"
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                  placeholder="Add a comment..."
                  className="border-2  border-white border-b-gray-300 outline-none text-sm mdd:text-base  mdd:px-4 px-1.5 py-1.5 w-[84%]"
                />
                {!isUpdateComment ? (
                  <button
                    onClick={handleComment}
                    className="bg-black hover:bg-gray-700 mr-1 cursor-pointer text-xs md:text-base md:ml-3 ml-9 xsm:ml-0.5 font-semibold text-white px-4 mdd:py-1.5 py-1 rounded-3xl"
                  >
                    Comment
                  </button>
                ) : (
                  <button
                    onClick={handleUpdateComment}
                    className="bg-black hover:bg-gray-700 mr-1 cursor-pointer text-xs md:text-base md:ml-3 ml-9 xsm:ml-0.5 font-semibold text-white px-4 mdd:py-1.5 py-1 rounded-3xl"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>

            <div className="myscrolbar flex flex-col max-h-[50vh] overflow-y-scroll gap-1">
              {comments?.map((comment) => (
                <div key={comment?._id}>
                  {comment?.user._id == user?.user?._id ? (
                    <div className="mt-4 w-[100%]">
                      <div className="flex items-center mdd:items-start">
                        <div className="flex gap-2 items-center w-[85%]">
                          <div className="mdd:h-11 h-9 mdd:w-11 w-10 rounded-full   bg-gray-100">
                            <img
                              src={comment?.user?.avatar}
                              className="w-full h-full rounded-full bg-gray-300"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col w-[100%]">
                            <div>
                              <h3 className="font-semibold text-sm">
                                @{comment?.user?.username} |{" "}
                                <span className="text-gray-500 mdd:text-sm text-xs">
                                  {comment?.timestamp
                                    .split("T")[0]
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </span>
                              </h3>
                              <p className="mdd:text-md text-sm text-gray-500 line-clamp-2">
                                {comment?.text}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row mdd:gap-2 gap-1 items-center">
                          <button
                            onClick={() => handleEdit(comment)}
                            className="flex cursor-pointer hover:scale-105  justify-center items-center xsm:text-xs mdd:text-[15px]  text-[blue]"
                          >
                            <FiEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment?._id)}
                            className="flex cursor-pointer hover:scale-105 items-center mdd:text-[15px] text-xs text-[red]"
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
                          <div className="mdd:h-11 h-9 mdd:w-11 w-10  rounded-full   bg-gray-100">
                            <img
                              src={comment?.user?.avatar}
                              className="rounded-full w-full h-full bg-gray-300"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col w-[100%]">
                            <div>
                              <h3 className="font-semibold text-sm">
                                @{comment?.user?.username} |{" "}
                                <span className="text-gray-500 mdd:text-sm text-xs">
                                  {comment?.timestamp
                                    .split("T")[0]
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </span>
                              </h3>
                              <p className="mdd:text-md text-sm text-gray-500 line-clamp-2">
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
        <div className="myscrolbar mdd:w-[34%] w-[98%] mt-2.5 md:pl-6 flex flex-col  gap-3 mdd:overflow-y-scroll  max-h-[155vh]">
          {allVideos?.map((video) => (
            <Link key={video?._id} to={`/video/${video?._id}`}>
              <div className="flex flex-col md:flex-row ml-[2%] gap-3">
                <div className="md:w-[42%] w-[100%]  md:h-[16vh] mdd:h-[13vh] h-[25vh]">
                  <img
                    src={video?.thumbnailUrl}
                    alt=""
                    className="w-full h-full rounded-md bg-gray-300"
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
