import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/Login"); // Redirect to student login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-8 font-sans">
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold text-green-900">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2 shadow-lg transition"
        >
          Logout
        </button>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Attendance Card */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-default">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Attendance</h2>
          <p className="text-gray-700">Mark your daily check-in and check-out.</p>
          <Link to="/attendance">
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105">
              Mark Attendance
            </button>
          </Link>
        </div>

        {/* Leave Request Card */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-default">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Leave Requests</h2>
          <p className="text-gray-700">Apply for leaves and track status.</p>
          <Link to="/leave">
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105">
              Request Leave
            </button>
          </Link>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-default">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Personal Details</h2>
          <p className="text-gray-700">Update your profile and contact info.</p>
          <Link to="/profile">
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105">
              Update Details
            </button>
          </Link>
        </div>
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-default">
    <h2 className="text-2xl font-semibold text-green-800 mb-4">Messages</h2>
    <p className="text-gray-700">Chat with admin for support and updates.</p>
    <Link to="/messages">
      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105">
        Open Messages
      </button>
    </Link>
  </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
