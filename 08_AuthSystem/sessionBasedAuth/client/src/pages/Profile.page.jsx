import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../api/userProfile.api";
import { useMutation } from "../hooks/useMutation.hooks";
import { useLogoutMutation } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/slice/auth.slice";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetProfileQuery();
  const {executeMutate : logout} = useMutation(useLogoutMutation)
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Clear local storage / cookies etc.
    
    logout({
      toastMessage : "logout...",
      callback : () => {
        dispatch(setLogout());
        navigate("/");
      }
    })
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600">
        <p className="text-white text-xl animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white shadow-2xl flex flex-col items-center"
      >
        {/* Profile Avatar */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 p-[3px] mb-6"
        >
          <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm">
            {user?.avatar ? (
              <img
                src={user?.avatar?.url}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUserCircle className="text-6xl text-white/90" />
            )}
          </div>

          {/* Glow ring animation */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 blur-md opacity-60 animate-pulse"></span>
        </motion.div>

        {/* Profile Info */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-pink-400 mb-2 text-center"
        >
          {user?.fullName || "User Name"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-200 mb-6"
        >
          Welcome back 👋
        </motion.p>

        {/* Info Cards */}
        <div className="w-full space-y-4">
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <FaEnvelope className="text-cyan-300 mr-3" />
            <div>
              <p className="text-sm text-gray-300">Email</p>
              <p className="text-white break-all">{user?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <FaUserAlt className="text-pink-300 mr-3" />
            <div>
              <p className="text-sm text-gray-300">Username</p>
              <p className="text-white">@{user?.username || "username"}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{
            scale: 1.07,
            boxShadow:
              "0 0 20px rgba(34,211,238,0.7), 0 0 40px rgba(244,114,182,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="mt-10 flex hover:cursor-pointer items-center gap-2 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <IoLogOut size={20} />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
