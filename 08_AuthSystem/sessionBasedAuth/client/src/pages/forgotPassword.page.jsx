import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, KeyRound, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleSendOtp = () => {
    if (!email) return toast.error("Enter email first!");
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(60);
      toast.success("OTP sent successfully!");
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP first!");
    if (otp === "123456") {
      setVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP! Try again.");
    }
  };

  const handleResendOtp = () => {
    setOtp("");
    handleSendOtp();
  };

  const handleResetPassword = () => {
    alert("Redirecting to reset password form...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0ea5a4] via-[#06b6d4] to-[#3b82f6] p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden border border-white/20"
      >
        {/* Left Side - Image Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#06b6d4]/60 to-[#3b82f6]/60 items-center justify-center p-6">
          <motion.img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq43Z8epdseZzN29Tb1uC_QmDHFxtdgO-hhg&s"
            alt="Forgot Password"
            className="w-4/5 drop-shadow-2xl rounded-[10px]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
          />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-2 drop-shadow-md"
          >
            Forgot Password 🔑
          </motion.h1>
          <p className="text-white/80 mb-8 text-center text-sm">
            Enter your registered email to receive a password reset OTP.
          </p>

          {/* Email Input */}
          <div className="w-full max-w-sm mb-4 relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none border border-white/30 focus:border-white/70 transition-all"
            />
            <Mail className="absolute left-4 top-4 text-white/70" size={20} />
            <button
              onClick={handleSendOtp}
              disabled={loading || timer > 0}
              className="absolute right-2 top-1.5 px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 rounded-lg text-indigo-500  font-semibold disabled:opacity-50 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin " size={16} />
              ) : timer > 0 ? (
                `${timer}s`
              ) : (
                "Send OTP"
              )}
            </button>
          </div>

          {/* OTP Input (after sending) */}
          {otpSent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm mb-4 relative"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none border border-white/30 focus:border-white/70 transition-all"
              />
              <KeyRound className="absolute left-4 top-3.5 text-white/70" size={20} />

              <button
                onClick={handleVerifyOtp}
                className="absolute right-2 top-1.5 px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-all"
              >
                Verify
              </button>

              <div className="text-right mt-1">
                <button
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                  className="text-xs text-white/70 hover:text-white transition-all disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </motion.div>
          )}

          {/* Reset Password Button */}
          <motion.button
            onClick={handleResetPassword}
            disabled={!verified}
            whileTap={{ scale: 0.95 }}
            className={`w-full max-w-sm py-3 rounded-xl mt-4 font-semibold text-lg transition-all shadow-lg ${
              verified
                ? "bg-white text-[#06b6d4] hover:bg-[#e0f7fa]"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }`}
          >
            Reset Password
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
