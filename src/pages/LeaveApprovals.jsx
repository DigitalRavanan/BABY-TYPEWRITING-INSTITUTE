import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, update } from "firebase/database";
import { auth } from "../firebase";

const LeaveApprovals = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true);
      try {
        const leaveCol = collection(db, "leaveRequests");
        const snapshot = await getDocs(leaveCol);
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeaveRequests(requests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
      setLoading(false);
    };

    fetchLeaveRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const leaveRef = doc(db, "leaveRequests", id);
      await updateDoc(leaveRef, { status });
      setLeaveRequests(prev =>
        prev.map(req => (req.id === id ? { ...req, status } : req))
      );
    } catch (error) {
      alert("Error updating leave status: " + error.message);
    }
  };

  if (loading) return <p>Loading leave requests...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Leave Approvals</h1>
      {leaveRequests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 p-2">Student Name</th>
              <th className="border border-gray-300 p-2">Leave Dates</th>
              <th className="border border-gray-300 p-2">Reason</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(({ id, studentName, startDate, endDate, reason, status }) => (
              <tr key={id} className="hover:bg-indigo-50">
                <td className="border border-gray-300 p-2">{studentName || "N/A"}</td>
                <td className="border border-gray-300 p-2">{startDate} - {endDate}</td>
                <td className="border border-gray-300 p-2">{reason || "N/A"}</td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={
                      status === "approved" ? "text-green-600 font-semibold" :
                      status === "rejected" ? "text-red-600 font-semibold" :
                      "text-yellow-600 font-semibold"
                    }
                  >
                    {status || "Pending"}
                  </span>
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(id, "approved")}
                    disabled={status === "approved"}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(id, "rejected")}
                    disabled={status === "rejected"}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveApprovals;
