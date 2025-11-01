import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailQuery } from "../api/auth.api";

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const params = useParams();
  const {isLoading, isSuccess, error, data, isError} = useVerifyEmailQuery(params.token);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
      >
        {isLoading && (
          <>
            <Loader2 className="mx-auto animate-spin text-indigo-600" size={60} />
            <h2 className="text-2xl font-semibold mt-6 text-gray-800">{"Email is verified !"}</h2>
            <p className="text-gray-500 mt-2">Please wait a few seconds...</p>
          </>
        )}

        {isSuccess && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center mb-4"
            >
              <CheckCircle className="text-green-500" size={80} />
            </motion.div>
            <h2 className="text-3xl font-semibold text-gray-800">{data?.message}</h2>
            <p className="text-gray-500 mt-2">Welcome aboard! Your account is ready.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Go to Home
            </button>
          </>
        )}

        {isError && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-7xl mb-2"
            >
              ❌
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-800">Verification Failed</h2>
            <p className="text-gray-500 mt-2">{error.data?.message}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Back to Home
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
