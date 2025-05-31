// src/pages/ForgotPassword.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ApiService } from "../constant/ApiService";
import "../styles/login.css"; 

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      toast.error("Please enter your email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      await ApiService.forgotPass(email); 
      toast.success("If an account with that email exists, a password reset code has been sent.");
      setEmail(""); 
    } catch (error: any) {

      toast.error(error.message || "Failed to send reset code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-amber-50-to-amber-100 p-4">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center mb-5">
            <h1 className="text-2xl font-weight-bold text-amber-700">
              <Link className="text-decoration-none orange-color-dark" to="/">
                NutriWise
              </Link>
            </h1>
            <p className="text-gray-600 mt-2">
              Reset your password
            </p>
          </div>

          <div className="bg-white login-form shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your email address to receive a password reset code.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="fw-bold form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`login-button w-full py-2 rounded text-white font-semibold ${
                  isSubmitting
                    ? "bg-amber-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Reset Code"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-decoration-none orange-color-light  text-amber-600 hover:text-amber-800 font-semibold"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};