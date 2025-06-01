import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Firebase login logic will come here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6">
      <motion.form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-xl max-w-md w-full p-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">
          Student Login
        </h2>

        <label className="block text-gray-700 mb-2 font-semibold">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="student@example.com"
        />

        <label className="block text-gray-700 mb-2 font-semibold">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your password"
        />

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-full font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Login
        </motion.button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/Register" className="text-blue-700 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
