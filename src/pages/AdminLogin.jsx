import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Your admin auth logic here
    // On success: navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl max-w-md w-full p-10"
      >
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center">
          Admin Login
        </h2>

        <label className="block text-gray-700 mb-2 font-semibold">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="admin@example.com"
        />

        <label className="block text-gray-700 mb-2 font-semibold">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your password"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
