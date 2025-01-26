import { axiosInstance } from "../config/axiosInstance";

const useRecipientApi = () => {
  
  const recordRecipientApi = async (formData) => {
    try {
      console.log("Payload being sent:", formData); // Debugging
      const response = await axiosInstance.post("/Recipient", formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in recordRecipientApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to register recipient. Please try again."
      );
    }
  };

  const checkRecipientExistApi = async (email) => {
    try {
      // First check if recipient already registered or not?
      console.log("Checking login for recipient:", email); // Debugging email
      const response = await axiosInstance.post("/Recipient/Email", { email });
      console.log("Recipient Login Response:", response); // Debugging response
      return response.data.exists;
    } catch (error) {
      console.error("Error in checkRecipientExistApi:", error.response?.message);
      throw new Error(
        error.response?.message || "Failed to search Recipient. Please try again."
      );
    }
  }


  return {
    recordRecipientApi,
    checkRecipientExistApi
  };
};

export default useRecipientApi;
