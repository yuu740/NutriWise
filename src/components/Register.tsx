import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../constant/ApiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/register.css";
import validateCredentials from "../utils/validCredentials";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validationError = validateCredentials(email, password);
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (validationError) {
      toast.error(validationError);
      return;
    }
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
    }
  };

  return (
    <>
      <div className="register-page">
        <h1 className="register-title">NutriWise</h1>
        <div className="register-form">
          <label className="register-label name">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />

          <label className="register-label email">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />

          <label className="register-label password">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />

          <button onClick={handleRegister} className="register-button">
            Join
          </button>
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
