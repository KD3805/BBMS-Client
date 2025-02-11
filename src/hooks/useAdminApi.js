import { axiosInstance } from "../config/axiosInstance";

const useAdminApi = () => {

  const recordAdminApi = async (formData) => {
    try {
      console.log("Payload being sent:", formData); // Debugging
      const response = await axiosInstance.post("/Admin", formData);
      return response.status === 200;
    } catch (error) {
      console.error("Error in recordAdminApi:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to register admin. Please try again."
      );
    }
  };

  const checkAdminExistApi = async (Email, Password) => {
    try {
      // First check if admin already registered or not?
      console.log("Checking login for admin:", Email, Password); // Debugging email
      const response = await axiosInstance.post("/Admin/Login", { Email, Password }, { headers: { Authorization: "" }, });
      console.log("Admin Login Response:", response.data); // Debugging response
      return response.data.exists;
    } catch (error) {
      console.error("Error in checkAdminExistApi:", error.response?.message);
      throw new Error(
        error.response?.message || "Failed to search admin. Please try again."
      );
    }
  }

  // Dashboard report fetches all statistics related to the admin dashboard
  const getAdminDashboardReportCounts = async () => {
    try {
      const response = await axiosInstance.get("/Admin/DashboardReport");
      return response.data;
    } catch (error) {
      console.error("Error in getAdminDashboardReportCounts:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
        "Failed to fetch report counts. Please try again."
      );
    }
  }

  return {
    recordAdminApi,
    checkAdminExistApi,
    getAdminDashboardReportCounts
  };
};

export default useAdminApi;
