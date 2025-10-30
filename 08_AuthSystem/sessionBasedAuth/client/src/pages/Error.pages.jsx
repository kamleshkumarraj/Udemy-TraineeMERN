import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Gradient Circles */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 text-center max-w-lg mx-auto"
      >
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 drop-shadow-md">
          404
        </h1>

        <p className="text-gray-300 text-xl mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-400 text-sm mt-1">
          It might have been moved or deleted.
        </p>

        {/* Animated Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-pink-500/40 transition-all"
        >
          <FaArrowLeft />
          Go Back Home
        </motion.button>
      </motion.div>

      {/* Floating Text Animation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          delay: 1,
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-10 text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} — All Rights Reserved
      </motion.p>
    </div>
  );
};

export default NotFound;
