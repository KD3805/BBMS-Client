import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
// Custom hook for form validation
import { InputField, SelectField, TextAreaField } from "../../custom/CustomComponents";
// Zustand state management
import { useRecipientStore } from "../../../zustand/store";
// Custom hook for API calls
import useFormValidation from "../../../hooks/useFormValidation";
import useRecipientApi from "../../../hooks/useRecipientApi";

const ManageRecipientProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recipient = useRecipientStore((state) => state.loggedRecipient);
  const setRecipient = useRecipientStore((state) => state.setLoggedRecipient);

  // Custom hook to manage API calls
  const { updateRecipientApi } = useRecipientApi();

  // Custom hook to manage form data and validation
  const {
    formData,
    errors,
    handleInputChange,
    validateForm,
    calculateAge,
  } = useFormValidation({
    Name: recipient?.name || "",
    DOB: recipient?.dob ? recipient.dob.split("T")[0] : "", // Extracting date part from ISO date string
    Age: recipient?.age || 0,
    Gender: recipient?.gender || "",
    BloodGroupName: recipient?.bloodGroupName || "",
    Phone: recipient?.phone || "",
    Email: recipient?.email || "",
    Address: recipient?.address || "",
  });

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Calculate Age from DOB
    const age = calculateAge(formData.DOB);
    formData.Age = age;

    // Validate form data
    if (validateForm()) {
      try {
        setLoading(true);

        // Ensure RecipientID is passed correctly in both the URL and request body
        await updateRecipientApi(recipient.recipientID, { ...formData, RecipientID: recipient.recipientID });

        setRecipient({ ...formData }); // Update logged recipient with new data
        Swal.fire("Success!", "Recipient request updated successfully!", "success");
      } catch (error) {
        Swal.fire("Oops!", error.message || "Error processing recipient. Please try again.", "error");
      } finally {
        navigate("/RecipientDashboard/?layout=0");
        setLoading(false);
      }
    } else {
      Swal.fire("Oops!", "Please fill all the required fields correctly.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl bg-gray-100 p-10 rounded-xl shadow-lg">
        <h4 className="text-3xl font-extrabold mb-10">
          Update Recipient Details
        </h4>

        <Toaster toastOptions={{ duration: 4000 }} />

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-lg">
            {/* Name */}
            <InputField
              label="Name"
              id="Name"
              placeholder="Enter your name"
              value={formData.Name}
              error={errors.Name}
              onChange={handleInputChange}
            />

            {/* DOB */}
            <InputField
              label="Date of Birth"
              id="DOB"
              type="date"
              placeholder="Enter birth date"
              value={formData.DOB}
              error={errors.DOB}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
            />

            {/* Gender */}
            <SelectField
              label="Gender"
              id="Gender"
              options={["Male", "Female", "Other"]}
              value={formData.Gender}
              error={errors.Gender}
              onChange={handleInputChange}
            />

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

            {/* Phone */}
            <InputField
              label="Phone Number"
              id="Phone"
              placeholder="Enter phone number"
              value={formData.Phone}
              error={errors.Phone}
              onChange={handleInputChange}
            />

            {/* Email */}
            <InputField
              label="Email"
              id="Email"
              value={formData.Email}
              readOnly={true}
            />
          </div>

          {/* Address */}
          <TextAreaField
            label="Address"
            id="Address"
            placeholder="Enter your address"
            value={formData.Address}
            error={errors.Address}
            onChange={handleInputChange}
          />

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
              disabled={loading}
            >
              {loading ? <CgSpinner size={20} className="animate-spin" /> : "Submit"}
            </button>
          </div>

          <p className="text-base text-center mt-4">
            Already a Recipient?&nbsp;
            <Link
              to={"/RecipientLogin"}
              className="underline font-bold hover:text-red-700 transition-all duration-300"
            >
              Login
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default ManageRecipientProfile;


