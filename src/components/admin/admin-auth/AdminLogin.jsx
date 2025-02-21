import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

// import { InputField } from "../../custom/CustomComponents";
import OtpInput from "../../phone-otp/OtpInput";

import { useAdminStore } from "../../../zustand/store";
import useAdminApi from "../../../hooks/useAdminApi";
import useOtpLoginApi from "../../../hooks/useOtpLoginApi";
import { InputField, OutlinedButton } from "../../custom/CustomComponents";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const { setLoggedAdmin } = useAdminStore(); // Zustand store
  const { checkAdminExistApi } = useAdminApi(); // Custom API hooks
  const { sendOtpApi, verifyOtpAdminLoginApi } = useOtpLoginApi();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const isAdminExist = await checkAdminExistApi(email, password);

      if (isAdminExist) {
        const otpSent = await sendOtpApi(email);
        if (otpSent) {
          setShowOtpInput(true);
          toast.success("OTP sent to your email successfully!");
        }
      } else {
        Swal.fire("Oops!", "Admin with given email does not exist.", "error");
      }
    } catch (error) {
      Swal.fire("Oops!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (otp) => {
    if (!email || !password || !otp) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      setLoading(true);
      const { token, adminDetails } = await verifyOtpAdminLoginApi(email, otp);

      if (token) {
        localStorage.setItem("adminToken", token); // Save token to localStorage
        setLoggedAdmin(adminDetails, token); // Save to Zustand store

        toast.success("OTP verified successfully!");
        Swal.fire("Red Vault", `Welcome back, ${adminDetails?.name}!`, "success");

        navigate("/AdminDashboard"); // Redirect to the dashboard
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
          Admin Login
        </h4>

        <Toaster toastOptions={{ duration: 4000 }} />

        {!showOtpInput ? (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              {/* Email */}
              <div className="mb-4">
                <InputField
                  label="Email"
                  id="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  error={error}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <InputField
                label="Password"
                id="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                error={error}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-6">
              <OutlinedButton
                type="submit"
                disabled={loading}
                loading={loading}
                text="Login"
                w="w-1/3"
              />
            </div>

            {/* <p className="text-base text-center mt-6">
              Want to become a Admin?&nbsp;
              <Link
                to={"/AdminSignup"}
                className="underline font-bold hover:text-gray-300 transition-all duration-300"
              >
                Register
              </Link>
            </p> */}
          </form>
        ) : (
          <OtpInput length={6} onOtpSubmit={handleOtpSubmit} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;