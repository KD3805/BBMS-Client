import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
// Custom hook for form validation
import { InputField, SelectField, TextAreaField } from "../../custom/CustomComponents";
// Zustand state management
import { useDonorStore } from "../../../zustand/store";
// Custom hook for API calls
import useFormValidation from "../../../hooks/useFormValidation"; 
import useDonationApi from "../../../hooks/useDonationApi";

const DonationForm = () => {
  const location = useLocation();
  const { state } = location;
  const donationData = state?.donation || null; // Get donation data if available
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const donor = useDonorStore((state) => state.loggedDonor);

  // Custom hook to manage form data and validation
  const {
    formData,
    errors,
    handleInputChange
  } = useFormValidation({
    DonorName: donor?.name || donor?.Name,
    BloodGroupName: donor?.bloodGroupName || donor?.BloodGroupName,
    Quantity: donationData ? donationData.quantity : 0,
    Weight: donationData ? donationData.weight : 0,
    Disease: donationData ? donationData.disease : "",
  });

  // Custom hook to manage API calls
  const { recordDonationApi, updateDonationApi } = useDonationApi();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (donationData) {
        // Update existing donation
        await updateDonationApi({ ...formData, DonationID: donationData.donationID });
        Swal.fire("Success!", "Donation request updated successfully!", "success");
      } else {
        // Record new donation
        await recordDonationApi(formData);
        Swal.fire("Thank you!", "Donation request recorded successfully!", "success");
      }
    } catch (error) {
      Swal.fire("Oops!", error.message || "Error processing donation. Please try again.", "error");
    } finally {
      navigate("/DonorDashboard");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen mt-10">
      <div className="w-full max-w-5xl bg-gray-100 p-10 rounded-xl shadow-lg">
        <h4 className="text-3xl font-extrabold mb-10">
          <span className="underline decoration-4 decoration-red-500">Do</span>nation Form
        </h4>

        <Toaster toastOptions={{ duration: 4000 }} />

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-lg">
            {/* Name */}
            <InputField
              label="Donor Name"
              id="DonorName"
              value={donor?.name || donor?.Name}
              readOnly={true}
            />

            {/* Blood Group */}
            <InputField
              label="Blood Group"
              id="BloodGroupName"
              value={donor?.bloodGroupName || donor?.BloodGroupName}
              readOnly={true}
            />

            {/* Quantity */}
            <InputField
              label="Blood Quantity (units)"
              id="Quantity"
              type="number"
              placeholder="Enter Quantity"
              value={formData.Quantity}
              error={errors.Quantity}
              onChange={handleInputChange}
            />

            {/* Weight */}
            <InputField
              label="Donor Weight (kg)"
              id="Weight"
              type="number"
              placeholder="Enter Weight"
              value={formData.Weight}
              error={errors.Weight}
              onChange={handleInputChange}
            />
            </div>

            {/* Disease */}
            <TextAreaField
              label="Disease (if any)"
              id="Disease"
              placeholder="Enter your Disease (if any)"
              value={formData.Disease}
              error={errors.Disease}
              onChange={handleInputChange}
              mandatory={false}
            />


          {/* Submit Button */}
          <div className="flex justify-center items-center gap-8 mt-4">
            <button
              type="submit"
              className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
              disabled={loading}
            >
              {loading ? <CgSpinner size={20} className="animate-spin" /> : "Submit"}
            </button>

            <button
              type="reset"
              className="bg-white text-black px-6 py-2 border border-black rounded hover:bg-gray-200 transition-all duration-300"
              disabled={loading}
              onClick={() => navigate("/DonorDashboard")}
            >
              Cancel
            </button>
          </div>

        </form>
        
      </div>
    </div>
  );
};

export default DonationForm;
