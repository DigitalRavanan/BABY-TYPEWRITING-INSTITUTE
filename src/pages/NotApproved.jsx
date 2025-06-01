import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotApproved() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Enrollment Pending Approval</h2>
      <p>Your registration is not yet approved by the admin. Please wait for approval.</p>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
}
