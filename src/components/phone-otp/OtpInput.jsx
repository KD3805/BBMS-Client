import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const OtpInput = ({
    length = 4,
    onOtpSubmit,
    loading = false,
    onResendOtp, // Callback to handle OTP resend
}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [timeLeft, setTimeLeft] = useState(300); // Timer in seconds (5 minutes)
    const [isExpired, setIsExpired] = useState(false); // To track if OTP has expired
    const inputRefs = useRef([]);

    useEffect(() => {
        // Start timer countdown
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsExpired(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];

        // Allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData("text");
        const newOtp = [...otp];
        for (let i = 0; i < paste.length && i < length; i++) {
            newOtp[i] = paste[i];
        }
        setOtp(newOtp);
        inputRefs.current[length - 1].focus();
    };

    const handleClick = (index) => {
        // Move cursor to the next to the number on click
        inputRefs.current[index].setSelectionRange(1, 1);

        // Optional: Check if previous field is empty then move focus to it
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleBackspace = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join("");
        if (otpValue.length !== length) {
            toast.error("Please enter a valid OTP.");
            return;
        }
        onOtpSubmit(otpValue); // Call the parent's function with the concatenated OTP
    };

    const handleResendOtp = async () => {
        setIsExpired(false); // Reset expiration
        setOtp(new Array(length).fill("")); // Clear OTP input fields
        setTimeLeft(300); // Restart timer
        if (onResendOtp) {
            await onResendOtp(); // Call parent's resend OTP logic
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {!isExpired && (
                <p className="text-base font-medium text-white">
                    OTP sent to your email successfully!
                </p>
            )}

            <div className="flex justify-center items-center text-black">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        ref={(input) => (inputRefs.current[index] = input)}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onPaste={handlePaste}
                        onKeyDown={(e) => handleBackspace(index, e)}
                        disabled={isExpired} // Disable inputs if OTP is expired
                        className={`w-12 h-12 m-3 text-center text-xl font-bold border border-gray-300 rounded focus:outline-none ${isExpired
                                ? "bg-gray-300 cursor-not-allowed"
                                : "focus:ring focus:ring-blue-300"
                            }`}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                {/* Timer Display */}
                <p className="text-base font-medium text-white">
                    {isExpired
                        ? "OTP has expired. Please resend OTP."
                        : `Time remaining: ${formatTime(timeLeft)}`}
                </p>

                {/* Verify OTP Button */}
                {/* Resend OTP Button */}
                {isExpired ? (
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className={`flex items-center font-bold justify-center w-full h-10 px-6 py-2 rounded shadow focus:outline-none  transition-all duration-300 ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-white border-2 border-red-700 text-red-700 hover:bg-red-400 hover:text-white hover:border-none"
                        }`}
                    >
                        Resend OTP
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading || isExpired} // Disable button during loading or if OTP expired
                        className={`flex items-center font-bold justify-center w-full h-10 px-6 py-2 rounded shadow focus:outline-none  transition-all duration-300 ${loading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-white border-2 border-red-700 text-red-700 hover:bg-red-400 hover:text-white hover:border-none"
                            }`}
                    >
                        {loading ? (
                            <CgSpinner size={20} className="animate-spin" />
                        ) : (
                            "Verify OTP"
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OtpInput;
