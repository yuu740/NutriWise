import React from "react";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const getUserData = () => {
  const token = Cookies.get("token");

  if (!token) {
    console.warn("Token is not available");
    return;
  }
  try {
    const data = decodeJwt(token);
    return data;
  } catch (error) {
    return;
  }
};

export default getUserData;
