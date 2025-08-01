import { useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [isLogIn, setIsLogin] = useState(true);
  const [loginPage, setLoginPage] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const dispatch = useDispatch();

  const heading = useRef(null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  // this function will fetch the user from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [loginData]);

  // this function will login the user
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoginPage(!loginPage);
      setLoginData({ email: "", password: "" });
      if (heading.current) {
        heading.current.innerText = "User Logged in successfully";
        heading.current.style.color = "green";
      }
      toast.success("User Logged in successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      if (heading.current) {
        heading.current.innerText = errorMessage;
        heading.current.style.color = "red";
      }
      toast.error(errorMessage); // Display the same message in the toast
    }
  }

  // this function will register the user
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        signUpData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSignUpData({
        username: "",
        email: "",
        password: "",
        avatar: "",
      });
      if (heading.current) {
        heading.current.innerText = "User Registered successfully";
        heading.current.style.color = "green";
      }
      toast.success("User Registered successfully");
      // Optionally switch to login mode
      setTimeout(() => setIsLogin(true), 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      if (heading.current) {
        heading.current.innerText = errorMessage;
        heading.current.style.color = "red";
      }
      toast.error(errorMessage); // Display the same message in the toast
    }
  }

  return (
    <div className="flex justify-center mt-17 flex-col items-center ">
      <div className="md:w-[40vw] w-[90vw] p-4 text-xs md:text-base bg-gray-100 rounded-xl">
        <h3
          ref={heading}
          className="md:text-2xl text-xl text-black font-bold m-auto text-center mb-2 w-full"
        >
          {isLogIn ? "LogIn" : "SignUp"}
        </h3>
        {isLogIn ? (
          <form className="flex flex-col gap-2 p-2.5" onSubmit={handleLogin}>
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
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Enter your email"
              required
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
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Enter your password"
              required
            />
            <div className="flex justify-center gap-2.5 items-center">
              {loginPage ? (
                <button
                  type="submit"
                  className="text-white md:w-63 w-43 py-1 bg-green-700 cursor-pointer mt-2.5 rounded-md outline-none border border-gray-300 hover:bg-green-600"
                >
                  Log in
                </button>
              ) : (
                <Link to="/">
                  {" "}
                  <button
                    type="submit"
                    className="text-white w-43 py-1 bg-green-700 cursor-pointer mt-2.5 rounded-md outline-none border border-gray-300 hover:bg-green-600"
                  >
                    Go to Home
                  </button>
                </Link>
              )}
              <div
                onClick={() => setIsLogin(false)}
                className="text-blue-700 font-semibold cursor-pointer mt-1.5 hover:text-blue-900 hover:underline "
              >
                Go to SignUp
              </div>
            </div>
          </form>
        ) : (
          <form
            className="flex flex-col gap-2 p-2.5"
            onSubmit={handleSignUp}
            autoComplete="off"
          >
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
              value={signUpData.username}
              onChange={handleSignUpChange}
              placeholder="Enter your username"
              required
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
              value={signUpData.email}
              onChange={handleSignUpChange}
              placeholder="Enter your email"
              required
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
              value={signUpData.password}
              onChange={handleSignUpChange}
              placeholder="Enter your password"
              required
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
              value={signUpData.avatar}
              onChange={handleSignUpChange}
              placeholder="Paste your image URL"
            />
            <div className="flex justify-center gap-2.5 items-center">
              <button
                type="submit"
                className="text-white md:w-63 w-43 py-1 bg-green-700 cursor-pointer mt-2.5 rounded-md outline-none border border-gray-300 hover:bg-green-600"
              >
                SignUp
              </button>
              <div
                onClick={() => setIsLogin(true)}
                className="text-blue-700 font-semibold cursor-pointer mt-1.5 hover:text-blue-900 hover:underline "
              >
                Go to LogIn
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
