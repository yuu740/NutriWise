import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../constant/ApiService";
import { toast, ToastContainer } from "react-toastify";

//1. rajin-rajin git pull
//2. kalo udah commit + sync change, git pull dulu baru pull request
//3. kalo ada error jangan pull request dulu
//4. setelah commit gui, sync change (git push tapi di source control)

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await ApiService.login(email, password);
      if (result.message === "Login successful") {
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
    <div style={styles.page}>
      <h1 style={styles.title}>NutriWise</h1>
      <div style={styles.formContainer}>
        <label style={styles.email}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputemail}
        />

        <label style={styles.password}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputpassword}
        />

        <button onClick={handleLogin} style={styles.button}>
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

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    backgroundColor: "#fdf0b7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#cc6600",
    fontFamily: '"Playfair Display SC", serif',
    fontWeight: "bold",
    marginBottom: "20px",
  },

  formContainer: {
    backgroundColor: "#FFB35C",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: "300px",
    height: "300px",
    borderRadius: "15px",
    position: "relative",
  },

  email: {
    fontFamily: '"Playfair Display", serif',
    position: "relative",
    fontSize: "20px",
    bottom: "10px",
    textAlign: "left",
    left: "5px",
    marginBottom: "-10px",
  },

  password: {
    fontFamily: '"Playfair Display", serif',
    marginBottom: "-5px",
    position: "relative",
    fontSize: "20px",
    textAlign: "left",
    left: "5px",
  },

  inputemail: {
    padding: "10px",
    borderRadius: "15px",
    border: "none",
    backgroundColor: "#FFB1B1",
    fontSize: "16px",
    height: "27px",
  },

  inputpassword: {
    padding: "10px",
    borderRadius: "15px",
    border: "none",
    backgroundColor: "#FFB1B1",
    height: "27px",
    fontSize: "16px",
  },

  button: {
    marginTop: "78px",
    marginLeft: "200px",
    padding: "10px",
    backgroundColor: "#F7E255",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    width: "64px",
    fontFamily: '"Playfair Display", serif',
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    bottom: "14px",
    right: "24px",
  },
};
