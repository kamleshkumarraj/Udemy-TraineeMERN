import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      setError("Please fill both fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    setSuccess("Password reset successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-4/5 lg:w-3/5 flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-[url('https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 text-white">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-pink-400"
          >
            Reset Password 🔒
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm text-gray-200">
                New Password
              </label>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 focus-within:border-cyan-400">
                <FaLock className="text-cyan-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-transparent outline-none text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-200">
                Confirm Password
              </label>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 focus-within:border-pink-400">
                <FaLock className="text-pink-300" />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-transparent outline-none text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center mt-2">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-sm text-center mt-2">
                {success}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md transition-all hover:shadow-lg hover:from-cyan-500 hover:to-pink-600"
            >
              Reset Password
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
