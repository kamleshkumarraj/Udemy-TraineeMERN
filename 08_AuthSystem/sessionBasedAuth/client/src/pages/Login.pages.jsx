import React from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center relative" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607083208173-7a7e2e2f6cc1?auto=format&fit=crop&w=900&q=80')" }}>
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
                placeholder="Username"
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white/20 rounded-2xl p-3 backdrop-blur-md shadow-inner">
              <FaLock className="text-white/70 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              Login
            </motion.button>

            {/* Extra Options */}
            <div className="text-center mt-4 text-white/80">
              <p className="text-sm">
                Don’t have an account?{" "}
                <a href="#" className="text-pink-300 hover:underline">Sign Up</a>
              </p>
              <p className="text-sm mt-2">
                <a href="#" className="text-purple-300 hover:underline">Forgot Password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
