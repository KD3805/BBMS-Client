import axios from "axios";
import { useDonorStore } from "../zustand/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BBMS_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logoutDonor = useDonorStore.getState().logoutDonor;
      logoutDonor(); // Clear token and donor data
      window.location.href = "/DonorLogin"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logoutRecipient = useRecipientStore.getState().logoutRecipient;
      logoutRecipient(); // Clear token and donor data
      window.location.href = "/RecipientLogin"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logoutAdmin = useAdminStore.getState().logoutAdmin;
      logoutAdmin(); // Clear token and donor data
      window.location.href = "/AdminLogin"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const donorToken = localStorage.getItem("donorToken");
  const recipientToken = localStorage.getItem("recipientToken");
  const adminToken = localStorage.getItem("adminToken");

  if (donorToken) {
    config.headers.Authorization = `Bearer ${donorToken}`;
  }
  if(recipientToken) {
    config.headers.Authorization = `Bearer ${recipientToken}`;
  }
  if(adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  return config;
});

export { axiosInstance };