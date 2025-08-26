"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // API call
  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
        confirmPassword
      });

      setMessage(response.data.message || "Password reset successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Reset failed. Please try again or request a new link."
      );
    }
  };

  // Get token from URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) setToken(urlToken);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {token ? (
          <form onSubmit={resetPassword} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">Invalid or missing token</p>
        )}

        {/* Success / Error messages */}
        {message && (
          <p className="mt-4 text-green-600 text-center font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
