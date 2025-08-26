"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token }); 
      setVerified(true);
    } catch (err) {
      setError("Verification failed. Please try again or request a new link.");
      console.log("Error verifying email:", err);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>

        {token ? (
          <p className="mb-4 text-gray-600">Verifying token: <span className="font-mono">{token}</span></p>
        ) : (
          <p className="mb-4 text-red-500">No token found in the URL.</p>
        )}

        {verified && (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">
            ✅ Your email has been successfully verified!
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
