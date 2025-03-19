import { axiosInstance } from "../config/axiosInstance";

const useBloodRequestApi = () => {

  const recordBloodRequestApi = async (formData) => {
    try {
      const response = await axiosInstance.post("/BloodRequest", formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in recordBloodRequestApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to donate blood. Please try again."
      );
    }
  };

  const updateBloodRequestApi = async (bloodRequestID, formData) => {
    try {
      const response = await axiosInstance.put(`/BloodRequest/${bloodRequestID}`, formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in updateBloodRequestApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to update bloodRequest request. Please try again."
      );
    }
  };

  const fetchAllBloodRequestsApi = async () => {
    try {
      const response = await axiosInstance.get("/BloodRequest");
      return response.data; 
    } catch (error) {
      console.error("Error in fetchAllBloodRequestsApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to fetch bloodRequest records. Please try again."
      );
    }
  };

  const getBloodRequestByIdApi = async (bloodRequestID) => {
    try {
      const response = await axiosInstance.get(`/BloodRequest/${bloodRequestID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getBloodRequestByIdApi:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch bloodRequest records. Please try again."
      );
    }
  };

  const getBloodRequestHistoryByRecipientIDApi = async (recipientID) => {
    try {
      const response = await axiosInstance.get(`/BloodRequest/History/${recipientID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getBloodRequestHistoryByRecipientID:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch bloodRequest records. Please try again."
      );
    }
  };

  // Recipient request REPORT that fetches all STATISTICS
  const getRecipientRequestReportByRecipientIDApi = async (recipientID) => {
    try {
      const response = await axiosInstance.get(`/BloodRequest/Report/${recipientID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getRecipientRequestReportByRecipientID:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch request report records. Please try again."
      );
    }
  };

  // Updated function to update bloodRequest status
  const updateBloodRequestStatusApi = async (RequestID, NewStatus) => {
    try {
      const response = await axiosInstance.put(`/BloodRequest/UpdateStatus/${RequestID}`, {
        RequestID,
        NewStatus
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error in updateBloodRequestStatusApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to update bloodRequest status. Please try again."
      );
    }
  };

  const deleteBloodRequestApi = async (BloodRequestID) => {
    try {
      const response = await axiosInstance.delete(`/BloodRequest/${BloodRequestID}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error in deleteBloodRequestApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to delete bloodRequest. Please try again."
      );

    }
  };

    return {
      recordBloodRequestApi,
      fetchAllBloodRequestsApi,
      getBloodRequestByIdApi,
      getBloodRequestHistoryByRecipientIDApi,
      getRecipientRequestReportByRecipientIDApi,
      updateBloodRequestApi,
      updateBloodRequestStatusApi,
      deleteBloodRequestApi
    };
  };

  export default useBloodRequestApi;