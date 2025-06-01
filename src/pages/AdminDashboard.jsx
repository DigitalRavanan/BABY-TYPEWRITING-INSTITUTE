import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8 font-sans">
      <header className="flex justify-between items-center max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold text-purple-900">Admin Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 shadow-lg transition"
          onClick={() => {
            // TODO: Add your logout logic here
            navigate("/admin-login");
          }}
        >
          Logout
        </button>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Student Management */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-pointer">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Student Management</h2>
          <p className="text-gray-700">View and manage student enrollments and attendance.</p>
          <button
            onClick={() => navigate("/admin/students")}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Manage Students
          </button>
        </div>

        {/* Leave Approvals */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-pointer">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Leave Approvals</h2>
          <p className="text-gray-700">Approve or reject leave requests from students.</p>
          <button
            onClick={() => navigate("/admin/leave-approvals")}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Approve Leaves
          </button>
        </div>

        {/* Messaging */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-pointer">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Messaging</h2>
          <p className="text-gray-700">Communicate with students and staff easily.</p>
          <button
            onClick={() => navigate("/admin/messages")}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Open Chat
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
