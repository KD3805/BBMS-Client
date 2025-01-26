import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

// import { InputField } from "../../custom/CustomComponents";
import OtpInput from "../../phone-otp/OtpInput";

import { useDonorStore } from "../../../zustand/store";
import useDonorApi from "../../../hooks/useDonorApi";
import useOtpLoginApi from "../../../hooks/useOtpLoginApi";

const DonorLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const { setLoggedDonor } = useDonorStore(); // Zustand store
  const { checkDonorExistApi } = useDonorApi(); // Custom API hooks
  const { sendOtpApi, verifyOtpDonorLoginApi } = useOtpLoginApi();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const isDonorExist = await checkDonorExistApi(email);

      if (isDonorExist) {
        const otpSent = await sendOtpApi(email);
        if (otpSent) {
          setShowOtpInput(true);
          toast.success("OTP sent to your email successfully!");
        }
      } else {
        Swal.fire("Oops!", "Donor with given email does not exist.", "error");
      }
    } catch (error) {
      Swal.fire("Oops!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (otp) => {
    if (!email || !otp) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      setLoading(true);
      const { token, donorDetails } = await verifyOtpDonorLoginApi(email, otp);

      if (token) {
        localStorage.setItem("donorToken", token); // Save token to localStorage
        setLoggedDonor(donorDetails, token); // Save to Zustand store

        toast.success("OTP verified successfully!");
        Swal.fire("Red Vault", `Welcome back, ${donorDetails?.name}!`, "success");

        navigate("/DonorDashboard"); // Redirect to the dashboard
      }
    } catch (error) {
      toast.error(error.message || "Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=2000&q=80"
          alt="Blood Donation"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="absolute z-10 w-full max-w-md red-bg-gradient text-white p-10 rounded-xl shadow-lg border-2 border-red-800">
        <h4 className="text-3xl font-extrabold mb-10 text-center">
          {/* <span className="underline decoration-4 decoration-red-500">Do</span> */}
          Donor Login
        </h4>

        <Toaster toastOptions={{ duration: 4000 }} />

        {!showOtpInput ? (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <div>
                <label htmlFor="Email" className="block font-bold text-lg">
                  Email <span className="text-red-300">*</span>
                </label>
                <input
                  type="email"
                  id="Email"
                  className={`w-full p-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <small className="text-sm text-zinc-200">{error}</small>}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="flex items-center font-bold justify-center w-1/3 h-10 px-6 py-2 rounded shadow focus:outline-none bg-white border-2 border-red-700 text-red-700 hover:bg-red-400 hover:text-white hover:border-none transition-all duration-300"
                disabled={loading}
              >
                {loading ? <CgSpinner size={20} className="animate-spin" /> : "Login"}
              </button>
            </div>

            <p className="text-base text-center mt-6">
              Want to become a Donor?&nbsp;
              <Link
                to={"/DonorSignup"}
                className="underline font-bold hover:text-gray-300 transition-all duration-300"
              >
                Register
              </Link>
            </p>
          </form>
        ) : (
          <OtpInput length={6} onOtpSubmit={handleOtpSubmit} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default DonorLogin;