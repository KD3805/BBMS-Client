import { axiosInstance } from "../config/axiosInstance";

const useDonorApi = () => {
  
  const recordDonorApi = async (formData) => {
    try {
      console.log("Payload being sent:", formData); // Debugging
      const response = await axiosInstance.post("/Donor", formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in recordDonorApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to register donor. Please try again."
      );
    }
  };

  const checkDonorExistApi = async (email) => {
    try {
      // First check if donor already registered or not?
      console.log("Checking login for donor:", email); // Debugging email
      const response = await axiosInstance.post("/Donor/Email", { email });
      console.log("Donor Login Response:", response.data); // Debugging response
      return response.data.exists;
    } catch (error) {
      console.error("Error in checkDonorExistApi:", error.response?.message);
      throw new Error(
        error.response?.message || "Failed to search donor. Please try again."
      );
    }
  }


  return {
    recordDonorApi,
    checkDonorExistApi
  };
};

export default useDonorApi;
