import { create } from "zustand"
import { axiosInstance } from "../config/axiosInstance";

export const useDonorStore = create((set) => ({
  loggedDonor: null,
  token: null,

  setLoggedDonor: (donor, token) => set({ loggedDonor: donor, token }),

  logoutDonor: () => {
    localStorage.removeItem("donorToken"); // Clear JWT from storage
    set({ loggedDonor: null, token: null }); // Reset the store
  },

  initializeDonor: async () => {
    const token = localStorage.getItem("donorToken");
    if (!token) return;

    try {
      const response = await axiosInstance.get("/Donor/Profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loggedDonor: response.data, token });
    } catch (error) {
      console.error("Auto-login failed:", error.message);
      localStorage.removeItem("donorToken");
    }
  },
}))


export const useRecipientStore = create((set) => ({
  loggedRecipient: null,
  token: null,

  setLoggedRecipient: (recipient, token) => set({ loggedRecipient: recipient, token }),

  logoutRecipient: () => {
    localStorage.removeItem("recipientToken"); // Clear JWT from storage
    set({ loggedRecipient: null, token: null }); // Reset the store
  },

  initializeRecipient: async () => {
    const token = localStorage.getItem("recipientToken");
    if (!token) return;

    try {
      const response = await axiosInstance.get("/Recipient/Profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loggedRecipient: response.data, token });
    } catch (error) {
      console.error("Auto-login failed:", error.message);
      localStorage.removeItem("recipientToken");
    }
  },
}))


export const useAdminStore = create((set) => ({
  loggedAdmin: null,
  token: null,

  setLoggedAdmin: (admin, token) => set({ loggedAdmin: admin, token }),

  logoutAdmin: () => {
    localStorage.removeItem("adminToken"); // Clear JWT from storage
    set({ loggedAdmin: null, token: null }); // Reset the store
  },

  initializeAdmin: async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const response = await axiosInstance.get("/Admin/Profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loggedAdmin: response.data, token });
    } catch (error) {
      console.error("Auto-login failed:", error.message);
      localStorage.removeItem("adminToken");
    }
  },
}));