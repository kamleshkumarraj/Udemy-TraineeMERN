import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function LogoutOtherDevicesAlert({ open, onConfirm, onCancel, message }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="text-yellow-500" size={32} />
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">
              {message}
            </h2>
            <p className="text-gray-600 mb-5">
              You are already logged in on 3 devices.  
              Continuing will logout your oldest active device.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Yes, Continue
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
