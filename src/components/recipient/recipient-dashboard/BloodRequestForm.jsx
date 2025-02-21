import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
// Custom hook for form validation
import { InputField, OutlinedButton, SelectField, TextAreaField } from "../../custom/CustomComponents";
// Zustand state management
import { useRecipientStore } from "../../../zustand/store";
// Custom hook for API calls
import useFormValidation from "../../../hooks/useFormValidation";
import useBloodRequestApi from "../../../hooks/useBloodRequestApi";

const BloodRequestForm = () => {
  const location = useLocation();
  const { state } = location;
  const bloodRequestData = state?.bloodRequest || null; // Get bloodRequest data if available
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recipient = useRecipientStore((state) => state.loggedRecipient);

  // Custom hook to manage form data and validation
  const {
    formData,
    errors,
    handleInputChange
  } = useFormValidation({
    RecipientName: recipient?.name || recipient?.Name,
    BloodGroupName: bloodRequestData?.bloodGroupName || "",
    Quantity: bloodRequestData?.quantity || "",
    Reason: bloodRequestData?.reason || "",
    Status: "Pending"
  });

  // Custom hook to manage API calls
  const { recordBloodRequestApi, updateBloodRequestApi } = useBloodRequestApi();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (bloodRequestData) {
        // Ensure BloodRequestID is passed correctly in both the URL and request body
        await updateBloodRequestApi(bloodRequestData.requestID, { ...formData, RequestID: bloodRequestData.requestID });
        Swal.fire("Success!", "Blood request updated successfully!", "success");
      } else {
        // Record new bloodRequest
        await recordBloodRequestApi(formData);
        Swal.fire("Thank you!", "Blood request recorded successfully!", "success");
      }
    } catch (error) {
      Swal.fire("Oops!", error.message || "Error processing bloodRequest. Please try again.", "error");
    } finally {
      navigate("/RecipientDashboard/?layout=2");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen mt-10">
      <div className="absolute z-10 w-full max-w-5xl red-bg-gradient text-white p-10 rounded-xl shadow-lg border-2 border-red-800">
        <h4 className="text-3xl font-extrabold mb-10 text-center">
          Blood Request Form
        </h4>

        <Toaster toastOptions={{ duration: 4000 }} />

        <form onSubmit={handleFormSubmit}>
          {/* Name */}
          <div className="mb-3">
            <InputField
              label="Recipient Name"
              id="RecipientName"
              value={recipient?.name || recipient?.Name}
              readOnly={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-lg">

            {/* Blood Group */}
            <SelectField
              label="Blood Group"
              id="BloodGroupName"
              options={[
                "AB-Ve",
                "AB+Ve",
                "A-Ve",
                "A+Ve",
                "B-Ve",
                "B+Ve",
                "Oh-Ve",
                "Oh+Ve",
                "O-Ve",
                "O+Ve",
              ]}
              value={formData.BloodGroupName}
              error={errors.BloodGroupName}
              onChange={handleInputChange}
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
          </div>

          {/* Reason */}
          <TextAreaField
            label="Reason"
            id="Reason"
            placeholder="Enter your Reason"
            value={formData.Reason}
            error={errors.Reason}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value.length > 200) {
                toast.error("Reason description is too long (max 200 characters).");
              } else {
                handleInputChange(e);
              }
            }}
          />


          {/* Submit Button */}
          <div className="flex justify-center items-center gap-8 mt-4 flex-wrap">
            <OutlinedButton
              type="submit"
              disabled={loading}
              loading={loading}
              text="Submit"
              w="w-36"
            />
            <button
              type="reset"
              className="w-36 bg-gray-300 text-black px-6 py-2 border border-black rounded hover:bg-gray-200 transition-all duration-300"
              disabled={loading}
              onClick={() => navigate("/RecipientDashboard")}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default BloodRequestForm;
