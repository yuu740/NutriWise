import React from "react";

const validateCredentials = (email: string, password: string): string | null => {
  if (!email.endsWith("@gmail.com")) return "Email must be a @gmail.com address";
  if (password.length < 8) return "Password must be at least 8 characters long";
  return null;
};

export default validateCredentials;