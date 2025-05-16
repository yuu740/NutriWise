import React from "react";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const getUserData = () => {
  const token = Cookies.get("token");
  console.log("This is token ", token);
  console.log(document.cookie);
  if (!token) {
    throw new Error("Token is not available");
  }
  try {
    const data = decodeJwt(token);
    console.log("THIS IS DATA : ", data)
    return data;
  } catch (error) {
    return;
  }
};

export default getUserData;
