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
  
  const fetchAllDonorsApi = async () => {
    try {
      const response = await axiosInstance.get("/Donor");
      return response.data; 
    } catch (error) {
      console.error("Error in fetchAllDonorsApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to fetch donor records. Please try again."
      );
    }
  };

  const getDonorByIdApi = async (donorID) => {
    try {
      const response = await axiosInstance.get(`/Donor/${donorID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getDonorHistoryByDonorID:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch donor records. Please try again."
      );
    }
  };

  const updateDonorApi = async (donorID, formData) => {
    try {
      console.log("Payload being sent in Donor Request (update):", formData); // Debugging
      const response = await axiosInstance.put(`/Donor/${donorID}`, formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in updateDonorApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to update donor request. Please try again."
      );
    }
  };

  const checkDonorExistApi = async (email) => {
    try {
      // First check if donor already registered or not?
      console.log("Checking login for donor:", email); // Debugging email
      const response = await axiosInstance.post(
        "/Donor/Email",
        { email },
        {
          // Ensure no Authorization header is sent
          headers: { Authorization: "" },
        }
      );
      console.log("Donor Login Response:", response.data); // Debugging response
      return response.data.exists;
    } catch (error) {
      console.error("Error in checkDonorExistApi:", error.response?.message);
      throw new Error(
        error.response?.message || "Failed to search donor. Please try again."
      );
    }
  }

  const deleteDonorApi = async (DonorID) => {
    try {
      const response = await axiosInstance.delete(`/Donor/${DonorID}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error in deleteDonorApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to delete donor. Please try again."
      );

    }
  };


  return {
    recordDonorApi,
    fetchAllDonorsApi,
    getDonorByIdApi,
    checkDonorExistApi,
    updateDonorApi,
    deleteDonorApi,
  };
};

export default useDonorApi;
