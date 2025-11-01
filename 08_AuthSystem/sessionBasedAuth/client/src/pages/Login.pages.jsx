import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { Link, useNavigate } from "react-router-dom"; // ✅ Correct import for React Router
import { useMutation } from "../hooks/useMutation.hooks";
import { useLoginMutation } from "../api/auth.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slice/auth.slice";

export default function LoginPage() {
  const {executeMutate : login, data : loginData, error : loginErr} = useMutation(useLoginMutation);
  const [userData, setUserData] = useState({
    email : "",
    password : ""
  });

  const [error, setError] = useState({
    email : "",
    password : ""
  })

  const errorConf = {
    email : [
      {required : true , message : "Please enter your email !"},
      {pattern : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , message : "Please enter valid email !"}
      ],
    password : [
      {required : true , message : "Password must be required !"},
      {minLength : 8 , message : "Password must be contain at least 8 character !"},
      {includes : '@&#' , message : "In password must be includes @ # &"},
      {pattern : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , message : "Password must be complex alphanumeric and special character also !"}
    ],
  };

  const validate = (formDataLocal) => {
    const error = {};
    Object.entries(formDataLocal).forEach(([key , value]) => {
      errorConf[key]?.some((rule) => {
        if(rule.required && !value){
          error[key] = rule.message
          return true
        }
        if(rule.pattern && !rule.pattern.test(value)){
          error[key] = rule.message
          return true
        }
        if(rule.minLength && value.length < rule.minLength ){
          error[key] = rule.message
          return true
        }
        if(rule.includes && !(value.includes(rule.includes[0]) || value.includes(rule.includes[1]) || value.includes(rule.includes[2]))){
          error[key] = rule.message
          return true
        }
      })
    })
    
    setError(error)
    return error
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const error = validate(userData);
    if(Object.keys(error).length > 0) {
      toast.error("All fields are required !")
      return;
    }
    login({args : userData, toastMessage : "User login...", callback : () => {
      navigate("/");
      dispatch(setLogin({
        isAuthenticated : true,
        role : null
      }))
    }, errCallback : (err) => {
      if(err?.data?.statusCode === 400 && err?.data?.message === 'You have logged in from too many devices'){
        navigate('/many-device-handle');
      }
    }});
  }

  const inputHandler = (e) => {
    setUserData((prevData) => ({...prevData , [e.target.name] : e.target.value}));
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image */}
        <div
          className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1607083208173-7a7e2e2f6cc1?auto=format&fit=crop&w=900&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold z-10 text-center drop-shadow-lg"
          >
            Welcome Back 👋
          </motion.h1>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 bg-white/10 backdrop-blur-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl font-semibold mb-6"
          >
            Login to Your Account
          </motion.h2>

          <form className="w-full max-w-sm space-y-5">
            {/* Username */}
            <div className="flex items-center bg-white/20 rounded-2xl p-3 backdrop-blur-md shadow-inner">
              <FaUserAlt className="text-white/70 mr-3" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={userData?.email}
                onChange={inputHandler}
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white/20 rounded-2xl p-3 backdrop-blur-md shadow-inner">
              <FaLock className="text-white/70 mr-3" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData?.password}
                onChange={inputHandler}
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loginHandler}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              Login
            </motion.button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-white/30"></div>
              <span className="text-white/60 px-3 text-sm">or</span>
              <div className="flex-grow h-px bg-white/30"></div>
            </div>

            {/* Continue with Google */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center bg-white/80 text-gray-700 py-3 rounded-2xl font-semibold shadow-md hover:bg-white transition-all"
              onClick={() => alert("Google Login Coming Soon!")}
            >
              <FcGoogle className="text-2xl mr-3" />
              Continue with Google
            </motion.button>

            {/* Extra Options */}
            <div className="text-center mt-4 text-white/80">
              <p className="text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-pink-300 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-sm mt-2">
                <Link to="#" className="text-purple-300 hover:underline">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
