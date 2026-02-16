"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OtpLoginModal({ onClose }) {
  const router = useRouter();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  /* Countdown */
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* Send OTP */
  const handleSendOtp = async () => {
    if (phone.length < 10) {
      alert("Valid phone number required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/store`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep("otp");
      setTimer(60);
    } catch (err) {
      alert(err.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  /* Verify OTP */
  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) {
      alert("Enter full OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ phone, otp: finalOtp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      onClose();
      router.push("/dashboard");
    } catch (err) {
      alert(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* OTP Input */
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      {/* Modal Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 relative animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Secure Login
        </h2>

        {step === "phone" && (
          <>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-5 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-pry hover-bg-sec text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-sm text-gray-500 text-center mb-4">
              OTP sent to {phone}
            </p>

            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  className="w-14 h-14 text-center text-xl font-bold border rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-sec hover-bg-pry text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center mt-4 text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend in {timer}s
                </span>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className="text-indigo-600 font-medium"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
