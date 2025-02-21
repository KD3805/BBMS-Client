import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
// Custom hook for form validation
import { InputField, OutlinedButton, SelectField, TextAreaField } from "../../custom/CustomComponents";
// Zustand state management
import { useDonorStore } from "../../../zustand/store";
// Custom hook for API calls
import useFormValidation from "../../../hooks/useFormValidation";
import useDonorApi from "../../../hooks/useDonorApi";

const ManageDonorProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const donor = useDonorStore((state) => state.loggedDonor);
  const setDonor = useDonorStore((state) => state.setLoggedDonor);

  // Custom hook to manage API calls
  const { updateDonorApi } = useDonorApi();

  // Custom hook to manage form data and validation
  const {
    formData,
    errors,
    handleInputChange,
    validateForm,
    calculateAge,
  } = useFormValidation({
    Name: donor?.name || "",
    DOB: donor?.dob ? donor.dob.split("T")[0] : "", // Extracting date part from ISO date string
    Age: donor?.age || 0,
    Gender: donor?.gender || "",
    BloodGroupName: donor?.bloodGroupName || "",
    Phone: donor?.phone || "",
    Email: donor?.email || "",
    Address: donor?.address || "",
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

        // Ensure DonorID is passed correctly in both the URL and request body
        await updateDonorApi(donor.donorID, { ...formData, DonorID: donor.donorID });

        setDonor({ ...formData }); // Update logged donor with new data
        Swal.fire("Success!", "Donor request updated successfully!", "success");
      } catch (error) {
        Swal.fire("Oops!", error.message || "Error processing donor. Please try again.", "error");
      } finally {
        navigate("/DonorDashboard/?layout=0");
        setLoading(false);
      }
    } else {
      Swal.fire("Oops!", "Please fill all the required fields correctly.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute z-10 w-full max-w-5xl red-bg-gradient text-white p-10 rounded-xl shadow-lg border-2 border-red-800">
        <h4 className="text-3xl font-extrabold mb-10 text-center">
          Update Donor Details
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
            <OutlinedButton
              type="submit"
              disabled={loading}
              loading={loading}
              text="Submit"
              w="w-40"
            />
          </div>

          <p className="text-base text-center mt-4">
            Already a Donor?&nbsp;
            <Link
              to={"/DonorLogin"}
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

export default ManageDonorProfile;


