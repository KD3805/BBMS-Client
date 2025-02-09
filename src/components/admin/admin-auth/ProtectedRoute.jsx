import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, initializeUser, redirectTo }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await initializeUser(); // Wait for the user initialization process
      setLoading(false); // Stop loading once initialized
    };
    checkAuth();
  }, [initializeUser]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading spinner or message while initializing
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export const DonorProtectedRoute = (props) => (
  <ProtectedRoute {...props} redirectTo="/DonorLogin" />  
);

export const RecipientProtectedRoute = (props) => (
  <ProtectedRoute {...props} redirectTo="/RecipientLogin" />
);

export const AdminProtectedRoute = (props) => (
  <ProtectedRoute {...props} redirectTo="/AdminLogin" />
);
