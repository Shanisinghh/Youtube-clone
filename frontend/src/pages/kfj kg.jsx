import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react"


function Login() {
  const [isLogIn, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  console.log(userData);
  const [SignUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  function handleSignUpChange(e) {
    setSignUpData({ ...SignUpData, [e.target.name]: e.target.value });
  }
  console.log(SignUpData);
  function handleLoginChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  const heading = useRef(null);
  console.log(heading);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/videos", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.response?.data || err.message);
      });
  }, [userData]);


  function handleLogin(e) {


    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
   setLoginData({
     email: "",
     password: "",
   })
  }



  // async function handleLogin(e) {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/login",
  //       loginData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     setLoginData({
  //       email: "",
  //       password: "",
  //     });
  //     // heading.current.innerText =` Welcome ${ response.data.user.username}`
  //     heading.current.innerText = ` User Loged in successfully`;
  //     heading.current.style.color = "green";
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error(
        
  //       "Login failed:",
  //       error.response?.data?.message || error.message
  //     );
  //   }
  // }
  async function handleSignUp(e) {
    e.preventDefault();


    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        SignUpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // heading.current.innerText =` Welcome ${ response.data.user.username}`
      heading.current.innerText = ` User Registered successfully`;
      heading.current.style.color = "green";
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
    }
  }


  return (
    <>
      <div className="flex justify-center flex-col items-center ">
        {isLogIn ? (
          <div className="w-[40vw] p-4 bg-gray-100 rounded-2xl">
            <h3
              ref={heading}
              className="text-2xl font-semibold m-auto text-center mb-2 w-full"
            >
              Login
            </h3>
            <form
              action=""
              method="POST"
              className="flex flex-col gap-2  p-2.5"
            >
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                className="outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold"
                id="email"
                name="email"
                onChange={handleLoginChange}
                placeholder="Enter your email"
              />
              <label
                htmlFor="password"
                className="text-md font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold"
                name="password"
                id="password"
                onChange={handleLoginChange}
                placeholder="Enter your password"
              />


              <div className="flex justify-center gap-2.5 items-center">
                <button
                  onClick={handleLogin}
                  className=" w-63  py-1 bg-green-700 cursor-pointer mt-2.5 rounded-md outline-none border border-gray-300 hover:bg-green-600"
                >
                  Submit
                </button>
                <div
                  onClick={() => setIsLogin(!isLogIn)}
                  className="text-blue-700 font-semibold cursor-pointer mt-1.5 hover:text-blue-900 hover:underline "
                >
                  Go to SignUP
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-[40vw] p-4 bg-gray-100 rounded-2xl">
            <h3
              ref={heading}
              className="text-2xl font-semibold m-auto text-center mb-2 w-full"
            >
              SignUp
            </h3>
            <form action="" className="flex flex-col gap-2  p-2.5">
              <label
                htmlFor="username"
                className="text-md font-semibold text-gray-700"
              >
                UserName
              </label>
              <input
                type="text"
                className="outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold"
                id="username"
                name="username"
                onChange={handleSignUpChange}
                placeholder="Enter your username"
              />
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                className="outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold"
                id="email"
                name="email"
                onChange={handleSignUpChange}
                placeholder="Enter your email"
              />
              <label
                htmlFor="password"
                className="text-md font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold"
                name="password"
                id="password"
                onChange={handleSignUpChange}
                placeholder="Enter your password"
              />
              <label
                htmlFor="userImage"
                className="text-md font-semibold text-gray-700"
              >
                User Image
              </label>
              <input
                type="text"
                className="outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold"
                name="avatar"
                id="userImage"
                onChange={handleSignUpChange}
                placeholder="Paste your image URL"
              />
              <div className="flex justify-center gap-2.5 items-center">
                <button
                  onClick={handleSignUp}
                  className=" w-63  py-1 bg-green-700 cursor-pointer mt-2.5 rounded-md outline-none border border-gray-300 hover:bg-green-600"
                >
                  Submit
                </button>
                <div
                  onClick={() => setIsLogin(!isLogIn)}
                  className="text-blue-700 font-semibold cursor-pointer mt-1.5 hover:text-blue-900 hover:underline "
                >
                  Go to Login
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}


export default Login;  