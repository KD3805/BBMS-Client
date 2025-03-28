import { axiosInstance } from "../config/axiosInstance";

// Implement API calls for sending OTP and validating OTP
const useOtpLoginApi = () => {
  const sendOtpApi = async (email) => {
    try {
      const response = await axiosInstance.post("/Otp/SendOTP", 
        { Email: email }, 
        { headers: { Authorization: "" } }
      );
      return response.data.success;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Network issue. Failed to send OTP. Please try again."
      );
    }
  };

  const verifyOtpDonorLoginApi = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/Otp/VerifyOTP/Donor/Login", 
        { Email: email, OtpCode: otp }, 
        { headers: { Authorization: "" } }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  };

  const verifyOtpDonorSignupApi = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/Otp/VerifyOTP/Donor/Signup", 
        { Email: email, OtpCode: otp }, 
        { headers: { Authorization: "" } }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  };

  const verifyOtpRecipientLoginApi = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/Otp/VerifyOTP/Recipient/Login", 
        { Email: email, OtpCode: otp }, 
        { headers: { Authorization: "" } 
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  };

  const verifyOtpRecipientSignupApi = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/Otp/VerifyOTP/Recipient/Signup", 
        { Email: email, OtpCode: otp }, 
        { headers: { Authorization: "" } 
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  };

  const verifyOtpAdminLoginApi = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/Otp/VerifyOTP/Admin/Login", 
        { Email: email, OtpCode: otp }, 
        { headers: { Authorization: "" } 
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  };

  const verifyOtpAdminSignupApi = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/Otp/VerifyOTP/Admin/Signup", 
        { Email: email, OtpCode: otp }, 
        { headers: { Authorization: "" } 
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  };

  return { sendOtpApi, verifyOtpDonorLoginApi, verifyOtpRecipientLoginApi, verifyOtpAdminLoginApi, verifyOtpAdminSignupApi, verifyOtpRecipientSignupApi, verifyOtpDonorSignupApi };
};

export default useOtpLoginApi
