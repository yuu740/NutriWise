import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiService } from "../constant/ApiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/register.css";
import validateCredentials from "../utils/validCredentials";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    const validationError = validateCredentials(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await ApiService.register(name, email, password);
      if (result.message === "User registered successfully") {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.warning(result.message);
      }
      console.log(result.message);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-amber-50-to-amber-100 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-amber-700">
              <Link className="text-decoration-none orange-color-dark" to="/">
                NutriWise
              </Link>
            </h1>
            <p className="text-gray-600 mt-2">
              Track your nutrition, plan your meals
            </p>
          </div>

          <div className="bg-white register-form shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Create an account</h2>
            <p className="text-gray-500 mb-6">
              Enter your details to create your NutriWise account
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="fw-bold form-label">
                  Username
                </label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
                <p className="form-text " style={{ fontSize: "12px" }}>
                  Password must be at least 8 characters and include a number
                  and special character
                </p>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-1 mb-4 block text-sm text-gray-700 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-decoration-none orange-color-light text-amber-600 hover:text-amber-800"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-decoration-none orange-color-light text-amber-600 hover:text-amber-800"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`register-button w-full py-2 rounded text-white font-semibold ${
                  isSubmitting
                    ? "bg-amber-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-decoration-none orange-color-light  text-amber-600 hover:text-amber-800 font-semibold"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
