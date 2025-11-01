import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut, AlertTriangle } from "lucide-react";

export default function SessionConflict() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForceLogout = async () => {
    try {
      setLoading(true);
      setMessage("");
      // API call to force logout from all other devices
      const res = await axios.post(
        "/api/auth/logout-others",
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message || "Logged out from all other devices.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl max-w-xl w-full p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Multiple Device Login Detected
        </h1>
        <p className="text-gray-600 mb-6">
          You are already logged in on multiple devices. To continue on this
          device, please log out from your other active sessions.
        </p>

        {message && (
          <p
            className={`text-sm mb-4 ${
              message.includes("wrong")
                ? "text-red-600"
                : "text-green-600 font-medium"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleForceLogout}
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <LogOut size={18} /> Logout Other Devices
              </>
            )}
          </button>
          <button
            onClick={handleForceLogout}
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <LogOut size={18} /> Logout From All Devices
              </>
            )}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>

        </div>
      </motion.div>
    </div>
  );
}
