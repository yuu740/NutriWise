import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { ApiService } from "../constant/ApiService";
import { toast, ToastContainer } from "react-toastify";
import validateCredentials from "../utils/validCredentials";
import Cookies from "js-cookie";

//1. rajin-rajin git pull
//2. kalo udah commit + sync change, git pull dulu baru pull request
//3. kalo ada error jangan pull request dulu
//4. setelah commit gui, sync change (git push tapi di source control)

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const validationError = validateCredentials(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    try {
      const result = await ApiService.login(email, password);
      if (result.message === "Login successful") {
        Cookies.set("token", result.token);
        toast.success(result.message);
        navigate("/");
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
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
              Track your nutrition, plan your meals
            </p>
          </div>

          <div className="bg-white login-form shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Login to your account
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your email and password to access your account
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
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
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-amber-600 orange-color-light hover:text-amber-800 text-decoration-none"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {isSubmitting ? "Creating Account..." : "Login"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-none orange-color-light  text-amber-600 hover:text-amber-800 font-semibold"
              >
                Sign Up
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
