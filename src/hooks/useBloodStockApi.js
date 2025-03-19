import { axiosInstance } from "../config/axiosInstance";

const useBloodStockApi = () => {

  const recordBloodStockApi = async (formData) => {
    try {
      const response = await axiosInstance.post("/BloodStock", formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in recordBloodStockApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to register blood stock. Please try again."
      );
    }
  };

  const fetchAllBloodStocksApi = async () => {
    try {
      const response = await axiosInstance.get("/BloodStock");
      return response.data;
    } catch (error) {
      console.error("Error in fetchAllBloodStocksApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to fetch blood stock records. Please try again."
      );
    }
  };

  const getBloodStockByIdApi = async (bloodStockID) => {
    try {
      const response = await axiosInstance.get(`/BloodStock/${bloodStockID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getBloodStockByIdApi:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch blood stock record. Please try again."
      );
    }
  };

  const updateBloodStockApi = async (bloodStockID, formData) => {
    try {
      const response = await axiosInstance.put(`/BloodStock/${bloodStockID}`, formData);
      // Accept both 200 and 204 as successful responses
      return response.status === 200 || response.status === 204;
    } catch (error) {
      console.error("Error in updateBloodStockApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to update blood stock request. Please try again."
      );
    }
  };

  const deleteBloodStockApi = async (BloodStockID) => {
    try {
      const response = await axiosInstance.delete(`/BloodStock/${BloodStockID}`);
      return response.status === 200 || response.status === 204;
    } catch (error) {
      console.error("Error in deleteBloodStockApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to delete bloodStock. Please try again."
      );
    }
  };

  const fetchBloodAvailabilityByGroupApi = async (bloodGroupName) => {
    try {
      const response = await axiosInstance.get(`/BloodStock/BloodAvailability/${bloodGroupName}`);
      return response.data;
    } catch (error) {
      console.error("Error in fetchBloodAvailabilityByGroupApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to fetch blood availability data. Please try again."
      );
    }
  };

  return {
    recordBloodStockApi,
    fetchAllBloodStocksApi,
    getBloodStockByIdApi,
    updateBloodStockApi,
    deleteBloodStockApi,
    fetchBloodAvailabilityByGroupApi,
  };
};

export default useBloodStockApi;
