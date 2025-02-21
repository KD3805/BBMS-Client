import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
// Custom hook for form validation
import { InputField, OutlinedButton, SelectField, TextAreaField } from "../../custom/CustomComponents";
import OtpInput from "../../phone-otp/OtpInput";
// Zustand state management
import { useRecipientStore } from "../../../zustand/store";
// Custom hook for API calls
import useFormValidation from "../../../hooks/useFormValidation"; 
import useRecipientApi from "../../../hooks/useRecipientApi";
import useOtpLoginApi from "../../../hooks/useOtpLoginApi";


const RecipientSignup = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setLoggedRecipient = useRecipientStore((state) => state.setLoggedRecipient);

  // Custom hook to manage form data and validation
  const {
    formData,
    errors,
    handleInputChange,
    validateForm,
    calculateAge,
  } = useFormValidation({
    Name: "",
    DOB: "",
    Age: 0,
    Gender: "",
    BloodGroupName: "",
    Phone: "",
    Email: "",
    Address: "",
  });

  // Custom hook to manage API calls
  const { recordRecipientApi, checkRecipientExistApi } = useRecipientApi();
  const { sendOtpApi, verifyOtpRecipientLoginApi } = useOtpLoginApi();

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

        // First, check if recipient already exists
        const isRecipientExist = await checkRecipientExistApi(formData.Email);
        if (isRecipientExist) {
          toast.error("Recipient with given email already exists.");
          return;
        }

        const otpSent = await sendOtpApi(formData.Email); // Send OTP
        if (otpSent) {
          setShowOtpInput(true);
          toast.success("OTP sent to your email successfully!");
        }
      } catch (error) {
        // toast.error(error.message || "Error sending OTP. Please try again.");
        Swal.fire("Oops!", error.message || "Error sending OTP. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire("Oops!", "Please fill all the required fields correctly.", "error");
    }
  };

  // Handle OTP verification and recipient registration
  const handleOtpSubmit = async (otp) => {
    try {
      setLoading(true);
      const otpVerified = await verifyOtpRecipientLoginApi(formData.Email, otp); // Verify OTP
      if (otpVerified) {
        // Record recipient data to backend only after OTP is verified
        await recordRecipientApi(formData);
        toast.success("OTP verified successfully!");
        Swal.fire("Good job!", "Recipient Registered Successfully", "success");

        setLoggedRecipient(formData); // set recipient details to store for global use

        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Error verifying OTP or registering recipient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=2000&q=80"
          alt="Blood Donation"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="absolute z-10 w-full max-w-5xl red-bg-gradient text-white p-10 rounded-xl shadow-lg border-2 border-red-800">
        <h4 className="text-3xl font-extrabold mb-10 text-center">
          Recipient Sign up
        </h4>

        <Toaster toastOptions={{ duration: 4000 }} />

        {!showOtpInput ? (
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
                type="email"
                placeholder="Enter your email"
                value={formData.Email}
                error={errors.Email}
                onChange={handleInputChange}
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
                w="w-1/3"
              />
            </div>

            <p className="text-base text-center mt-4">
              Already a Recipient?&nbsp;
              <Link
                to={"/RecipientLogin"}
                className="underline font-bold hover:text-red-300 transition-all duration-300"
              >
                Login
              </Link>
            </p>
          </form>
        ) : (
          <OtpInput
            length={6}
            onOtpSubmit={handleOtpSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default RecipientSignup;


