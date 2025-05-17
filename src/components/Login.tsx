import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApiService } from "../constant/ApiService";
import { toast, ToastContainer } from "react-toastify";
import "../styles/login.css";
import validateCredentials from "../utils/validCredentials";
import Cookies from "js-cookie";

//1. rajin-rajin git pull
//2. kalo udah commit + sync change, git pull dulu baru pull request
//3. kalo ada error jangan pull request dulu
//4. setelah commit gui, sync change (git push tapi di source control)

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
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
        navigate("../App");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="login-page">
        <h1 className="login-test">NutriWise</h1>
        <div className="login-form">
          <label className="login-label email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <label className="login-label password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button onClick={handleLogin} className="login-button">
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
