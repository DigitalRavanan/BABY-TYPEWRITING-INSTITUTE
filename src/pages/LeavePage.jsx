import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";  // Correct import
import { auth } from "../firebase";

const LeaveRequest = () => {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const user = auth.currentUser;

    if (user) {
      const leaveRef = ref(db, `leaves/${user.uid}`);
      await push(leaveRef, {
        date,
        reason,
        status: "Pending",
      });
      alert("Leave request submitted!");
      setReason("");
      setDate("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">Leave Request</h2>

        <label className="block mb-2 font-semibold">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <label className="block mb-2 font-semibold">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg"
          placeholder="Enter your reason for leave"
        />

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default LeaveRequest;
