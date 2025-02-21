import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import DonorDashboard from "./components/donor/donor-dashboard/DonorDashboard.jsx";
import DonorSignup from "./components/donor/donor-auth/DonorSignup.jsx";
import DonorLogin from "./components/donor/donor-auth/DonorLogin.jsx";
import RecipientDashboard from "./components/recipient/recipient-dashboard/RecipientDashboard.jsx";
import RecipientSignup from "./components/recipient/recipient-auth/RecipientSignup.jsx";
import RecipientLogin from "./components/recipient/recipient-auth/RecipientLogin.jsx";
import AdminLogin from "./components/admin/admin-auth/AdminLogin.jsx";
import AdminDashboard from "./components/admin/admin-dashboard/AdminDashboard.jsx";
import {
  AdminProtectedRoute,
  DonorProtectedRoute,
  RecipientProtectedRoute,
} from "./components/admin/admin-auth/ProtectedRoute.jsx";
import { useDonorStore, useRecipientStore, useAdminStore } from "./zustand/store";
import AboutBloodDonation from "./components/about/AboutBloodDonation.jsx";
import Eligibility from "./components/about/Eligibility.jsx";
import ThalassemiaDetection from "./components/thalassemia/ThalassemiaDetection.jsx";
import BloodAvailability from "./components/blood-stock/BloodAvailability.jsx";

const MainApp = () => {
  const initializeDonor = useDonorStore((state) => state.initializeDonor);
  const initializeRecipient = useRecipientStore((state) => state.initializeRecipient);
  const initializeAdmin = useAdminStore((state) => state.initializeAdmin);

  const donorAuth = useDonorStore((state) => !!state.loggedDonor);
  const recipientAuth = useRecipientStore((state) => !!state.loggedRecipient);
  const adminAuth = useAdminStore((state) => !!state.loggedAdmin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/DonorSignup" element={<DonorSignup />} />
          <Route path="/RecipientSignup" element={<RecipientSignup />} />
          <Route path="/DonorLogin" element={<DonorLogin />} />
          <Route path="/RecipientLogin" element={<RecipientLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AboutBloodDonation" element={<AboutBloodDonation />} />
          <Route path="/Eligibility" element={<Eligibility />} />
          <Route path="/Thalassemia/Detection" element={<ThalassemiaDetection />} />
          <Route path="/BloodAvailability" element={<BloodAvailability />} />
        </Route>
        {/* Donor Protected Routes */}
        <Route
            path="/DonorDashboard"
            element={
              <DonorProtectedRoute
                isAuthenticated={donorAuth}
                initializeUser={initializeDonor}
              >
                <DonorDashboard />
              </DonorProtectedRoute>
            }
          />

          {/* Recipient Protected Routes */}
          <Route
            path="/RecipientDashboard"
            element={
              <RecipientProtectedRoute
                isAuthenticated={recipientAuth}
                initializeUser={initializeRecipient}
              >
                <RecipientDashboard />
              </RecipientProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/AdminDashboard"
            element={
              <AdminProtectedRoute
                isAuthenticated={adminAuth}
                initializeUser={initializeAdmin}
              >
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);