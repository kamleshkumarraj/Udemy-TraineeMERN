import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";

export default function RegisterPage() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600">
      <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image */}
        <div
          className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/010/925/404/non_2x/registration-page-name-and-password-field-fill-in-form-menu-bar-corporate-website-create-account-user-information-flat-design-modern-illustration-vector.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold z-10 text-center drop-shadow-lg"
          >
            Join the Future with Us 🚀
          </motion.h1>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 bg-white/10 backdrop-blur-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl font-semibold mb-6"
          >
            Create Your Account
          </motion.h2>

          {/* Avatar Upload Section */}
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center text-white/70">
                  <FaUserAlt size={40} />
                </div>
              )}
            </div>
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full cursor-pointer hover:scale-105 transition"
            >
              <FaCamera className="text-white" />
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Registration Form */}
          <form className="w-full max-w-sm space-y-5">
            {/* Username */}
            <div className="flex items-center bg-white/20 rounded-2xl p-3 backdrop-blur-md shadow-inner">
              <FaUserAlt className="text-white/70 mr-3" />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-white/20 rounded-2xl p-3 backdrop-blur-md shadow-inner">
              <FaEnvelope className="text-white/70 mr-3" />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

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

            {/* Confirm Password */}
            <div className="flex items-center bg-white/20 rounded-2xl p-3 backdrop-blur-md shadow-inner">
              <FaLock className="text-white/70 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              Register
            </motion.button>

            <div className="text-center mt-4 text-white/80">
              <p className="text-sm">
                Already have an account?{" "}
                <a href="#" className="text-pink-300 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
