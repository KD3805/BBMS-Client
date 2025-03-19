import { axiosInstance } from "../config/axiosInstance";

const useRecipientApi = () => {
  
  const recordRecipientApi = async (formData) => {
    try {
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

  const fetchAllRecipientsApi = async () => {
    try {
      const response = await axiosInstance.get("/Recipient");
      return response.data; 
    } catch (error) {
      console.error("Error in fetchAllRecipientsApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to fetch recipient records. Please try again."
      );
    }
  };

  const getRecipientByIdApi = async (recipientID) => {
    try {
      const response = await axiosInstance.get(`/Recipient/${recipientID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getRecipientHistoryByRecipientID:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch recipient records. Please try again."
      );
    }
  };

  const updateRecipientApi = async (recipientID, formData) => {
    try {
      const response = await axiosInstance.put(`/Recipient/${recipientID}`, formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in updateRecipientApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to update recipient request. Please try again."
      );
    }
  };

  const checkRecipientExistApi = async (email) => {
    try {
      // First check if recipient already registered or not?
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

  const deleteRecipientApi = async (RecipientID) => {
    try {
      const response = await axiosInstance.delete(`/Recipient/${RecipientID}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error in deleteRecipientApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to delete recipient. Please try again."
      );

    }
  };

  return {
    recordRecipientApi,
    checkRecipientExistApi,
    fetchAllRecipientsApi,
    getRecipientByIdApi,
    updateRecipientApi,
    deleteRecipientApi
  };
};

export default useRecipientApi;
