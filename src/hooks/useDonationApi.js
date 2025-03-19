import { axiosInstance } from "../config/axiosInstance";

const useDonationApi = () => {
  const recordDonationApi = async (formData) => {
    try {
      const response = await axiosInstance.post("/Donation", formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in recordDonationApi:", error.response?.data);
      throw new Error(
        error.response?.data || "Failed to donate blood. Please try again."
      );
    }
  };

  const updateDonationApi = async (donationID, formData) => {
    try {
      const response = await axiosInstance.put(
        `/Donation/${donationID}`,
        formData
      );
      return response.status === 200;
    } catch (error) {
      console.error("Error in updateDonationApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to update donation request. Please try again."
      );
    }
  };

  const fetchAllDonationsApi = async () => {
    try {
      const response = await axiosInstance.get("/Donation");
      return response.data;
    } catch (error) {
      console.error("Error in fetchAllDonationsApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to fetch donation records. Please try again."
      );
    }
  };

  const getDonationByIdApi = async (donationID) => {
    try {
      const response = await axiosInstance.get(`/Donation/${donationID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getDonationByIdApi:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch donation records. Please try again."
      );
    }
  };

  const getDonationHistoryByDonorIDApi = async (donorID) => {
    try {
      const response = await axiosInstance.get(`/Donation/History/${donorID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getDonationHistoryByDonorID:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch donation records. Please try again."
      );
    }
  };

  // Donation Report that fetches all statistics related to donations of a specific donor
  const getDonationReportByDonorIDApi = async (donorID) => {
    try {
      const response = await axiosInstance.get(`/Donation/Report/${donorID}`);
      return response.data;
    } catch (error) {
      console.error("Error in getDonationReportByDonorID:", error);
      throw new Error(
        error.response?.data ||
        "Failed to fetch donation records. Please try again."
      );
    }
  };

  // Updated function to update donation status
  const updateDonationStatusApi = async (DonationID, NewStatus) => {
    try {
      const response = await axiosInstance.put(
        `/Donation/UpdateStatus/${DonationID}`,
        {
          DonationID,
          NewStatus,
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Error in updateDonationStatusApi:", error.response?.data);
      throw new Error(
        error.response?.data ||
        "Failed to update donation status. Please try again."
      );
    }
  };

  const deleteDonationApi = async (DonationID) => {
    try {
      const response = await axiosInstance.delete(`/Donation/${DonationID}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error in deleteDonationApi:", error.response?.data);
      throw new Error(
        error.response?.data || "Failed to delete donation. Please try again."
      );
    }
  };

  return {
    recordDonationApi,
    fetchAllDonationsApi,
    getDonationByIdApi,
    getDonationHistoryByDonorIDApi,
    getDonationReportByDonorIDApi,
    updateDonationApi,
    updateDonationStatusApi,
    deleteDonationApi,
  };
};

export default useDonationApi;

// @useDonationApi.js
// @DonorRepository.jsx
// @DonationForm.jsx

// - Analyze and explore given three files, understand the code.
// - Then I want to implement update functionaliy with complate accuracy, efficiency and proper structure/format in DonationRepository.
// - When donor hit the edit button from donation list, handleUpdateDonationRequest() will handle the request and redirect the data to DonationForm, which is already used to insert new donation record, I want that it can also be used to update the request.
// - For that first it will get old donation details from getDonationByIdApi() if update is requested, so first it will display old donation data in form to user. Then user will update the data and hit the update button.
// - Then updated data will be send to PUT API, and it will update the donation request.
// - So, DonationForm will serve both purpose for add and edit.
// - Please implement best logic and optimal solution.
