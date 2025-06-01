// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const adminEmails = ["vijayanharish525@gmail.com"];

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">BABY TYPEWRITING</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/courses" className="hover:underline">Courses</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/admin-login" className="hover:underline">Admin</Link>
          </>
        )}

        {user && !adminEmails.includes(user.email) && (
          <>
            <Link to="/student-dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="ml-2 underline">Logout</button>
          </>
        )}

        {user && adminEmails.includes(user.email) && (
          <>
            <Link to="/admin-dashboard" className="hover:underline">Admin Dashboard</Link>
            <button onClick={handleLogout} className="ml-2 underline">Logout</button>
          </>
        )}

        {user && (
          <span className="ml-2 text-sm italic">
            {adminEmails.includes(user.email) ? "Admin" : user.email}
          </span>
        )}
      </div>
    </nav>
  );
}
