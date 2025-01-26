// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP9m-GK-aRM4OQ0TBXgQ7MmY2gk14RCMk",
  authDomain: "login-otp-92a6f.firebaseapp.com",
  projectId: "login-otp-92a6f",
  storageBucket: "login-otp-92a6f.appspot.com",
  messagingSenderId: "1032449923159",
  appId: "1:1032449923159:web:cb88e4904ddffaf5ad2b12",
  measurementId: "G-VKBJ192ZMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Disable app verification for development environments
if (process.env.NODE_ENV === "development") {
  if (!auth.settings) {
    auth.settings = {}; // Initialize settings if it doesn't exist
  }
  auth.settings.appVerificationDisabledForTesting = true;
  console.warn("Firebase app verification is disabled for testing!");
}

export { app, auth };
