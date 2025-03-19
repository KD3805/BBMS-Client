import axios from "axios";
import { useDonorStore, useRecipientStore, useAdminStore } from "../zustand/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BBMS_BACKEND_URL, // e.g., "/api" in development
  headers: {
    "Content-Type": "application/json",
  },
});

// Consolidated response interceptor for 401 errors.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Determine which store's token is present
      const donorToken = localStorage.getItem("donorToken");
      const recipientToken = localStorage.getItem("recipientToken");
      const adminToken = localStorage.getItem("adminToken");

      if (donorToken) {
        const logoutDonor = useDonorStore.getState().logoutDonor;
        logoutDonor(); // Clear donor token and data
        window.location.href = "/DonorLogin";
      } else if (recipientToken) {
        const logoutRecipient = useRecipientStore.getState().logoutRecipient;
        logoutRecipient(); // Clear recipient token and data
        window.location.href = "/RecipientLogin";
      } else if (adminToken) {
        const logoutAdmin = useAdminStore.getState().logoutAdmin;
        logoutAdmin(); // Clear admin token and data
        window.location.href = "/AdminLogin";
      }
    }
    return Promise.reject(error);
  }
);

// Request interceptor to set the Authorization header based on available token.
// In case multiple tokens exist, you might want to decide on a priority.
axiosInstance.interceptors.request.use((config) => {
  const donorToken = localStorage.getItem("donorToken");
  const recipientToken = localStorage.getItem("recipientToken");
  const adminToken = localStorage.getItem("adminToken");

  if (donorToken) {
    config.headers.Authorization = `Bearer ${donorToken}`;
  } else if (recipientToken) {
    config.headers.Authorization = `Bearer ${recipientToken}`;
  } else if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  return config;
});

export { axiosInstance };
