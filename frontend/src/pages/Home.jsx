import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useState } from 'react';

function Home() {
  const [videos, setVideos] = useState([]);
  console.log(videos?.thumbnailUrl);
  for (let i = 0; i < videos.length; i++) {
    // console.log(videos[i]?.uploader?.avatar);
  }
  useEffect(() => {
   
      axios.get("http://localhost:3000/api/videos", { withCredentials: true })
      .then((result) => {
       setVideos(result.data.allVideos);
        console.log(result.data.allVideos); // Uncomment for debugging
      })
      .catch((err) => {
        console.error("Fetch error:", err.response?.data || err.message);
      });
   
  }, []);
  return (
    <>
      <div className='flex mt-17 '>
        <div id='sidebar' className='w-[20vw] h-[100vh] bg-amber-200'>
            <Sidebar/>
        </div>
        <div id='main' className='flex gap-1 w-[80vw] h-[100vh] bg-red-500'>
           {videos?.map((video) =>  <div key={video?._id} className=' rounded-xl h-[45vh]  m-1.5 pb-2.5 bg-amber-50'>
              <img className='h-[28vh] w-[23vw] rounded-xl' src={video?.thumbnailUrl} alt="" />
              <div className='flex gap-2 mt-3'>
                <div>
                  <img className='h-11 w-11 bg-gray-400 rounded-full' src={video?.uploader?.avatar} alt="" />
                </div>
                <div className='flex flex-col leading-tight'>
                  <h3 className='font-semibold text-lg'>{video?.title}</h3>
                  <p className='text-md text-gray-500'>{video?.uploader?.name}</p>
                  <p className='text-sm text-gray-500'>{video?.views} | {video?.uploadDate.split("T")[0]}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </>
  )
}

export default Home