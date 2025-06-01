import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  ref,
  onValue,
  update,
  push,
  set,
  remove,
} from "firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [messages, setMessages] = useState({});
  const [replyMessages, setReplyMessages] = useState({});
  const navigate = useNavigate();

  const adminUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!adminUid) {
      navigate("/login");
      return;
    }

    // Load all students
    const studentsRef = ref(db, "students");
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const studentsArray = Object.entries(data).map(([uid, student]) => ({
        uid,
        ...student,
      }));
      setStudents(studentsArray);
    });

    // Load all leave requests (flattened)
    const leavesRef = ref(db, "leaves");
    onValue(leavesRef, (snapshot) => {
      const leavesData = snapshot.val() || {};
      const allLeaves = [];
      for (const studentId in leavesData) {
        for (const leaveId in leavesData[studentId]) {
          allLeaves.push({
            studentId,
            leaveId,
            ...leavesData[studentId][leaveId],
          });
        }
      }
      setLeaves(allLeaves);
    });

    // Load all messages (studentId => messages array)
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      setMessages(snapshot.val() || {});
    });
  }, [adminUid, navigate]);

  // Approve or Reject Student
  const handleStudentApproval = (uid, approved) => {
    update(ref(db, `students/${uid}`), { approved });
  };

  // Approve or Reject Leave Request
  const handleLeaveApproval = (studentId, leaveId, status) => {
    update(ref(db, `leaves/${studentId}/${leaveId}`), { status });
  };

  // Send message to a student
  const handleSendReply = (studentId) => {
    if (!replyMessages[studentId]?.trim()) return;
    const messagesRef = push(ref(db, `messages/${studentId}`));
    set(messagesRef, {
      text: replyMessages[studentId],
      sender: "admin",
      timestamp: new Date().toISOString(),
    });
    setReplyMessages((prev) => ({ ...prev, [studentId]: "" }));
  };

  // Logout
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Student Registrations</h3>
        {students.length === 0 && <p>No students registered yet.</p>}
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-1">Name</th>
              <th className="border border-gray-300 px-3 py-1">Email</th>
              <th className="border border-gray-300 px-3 py-1">Course</th>
              <th className="border border-gray-300 px-3 py-1">Approved</th>
              <th className="border border-gray-300 px-3 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ uid, name, email, course, approved }) => (
              <tr key={uid} className="text-center">
                <td className="border border-gray-300 px-3 py-1">{name}</td>
                <td className="border border-gray-300 px-3 py-1">{email}</td>
                <td className="border border-gray-300 px-3 py-1">{course}</td>
                <td className="border border-gray-300 px-3 py-1">
                  {approved ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-3 py-1 space-x-2">
                  {!approved && (
                    <>
                      <button
                        onClick={() => handleStudentApproval(uid, true)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStudentApproval(uid, false)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {approved && (
                    <button
                      onClick={() => handleStudentApproval(uid, false)}
                      className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Leave Requests</h3>
        {leaves.length === 0 && <p>No leave requests.</p>}
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-1">Student ID</th>
              <th className="border border-gray-300 px-3 py-1">Reason</th>
              <th className="border border-gray-300 px-3 py-1">Status</th>
              <th className="border border-gray-300 px-3 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(({ studentId, leaveId, reason, status }) => (
              <tr key={leaveId} className="text-center">
                <td className="border border-gray-300 px-3 py-1">{studentId}</td>
                <td className="border border-gray-300 px-3 py-1">{reason}</td>
                <td className="border border-gray-300 px-3 py-1">{status}</td>
                <td className="border border-gray-300 px-3 py-1 space-x-2">
                  {status === "pending" && (
                    <>
                      <button
                        onClick={() => handleLeaveApproval(studentId, leaveId, "approved")}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleLeaveApproval(studentId, leaveId, "rejected")}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {status !== "pending" && <span>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Messages</h3>
        {Object.keys(messages).length === 0 && <p>No messages.</p>}
        {Object.entries(messages).map(([studentId, msgs]) => (
          <div
            key={studentId}
            className="mb-4 border p-4 rounded bg-gray-50 max-h-64 overflow-y-auto"
          >
            <h4 className="font-semibold mb-2">Messages from {studentId}</h4>
            {msgs.map((msg, i) => (
              <div
                key={i}
                className={`mb-1 p-2 rounded ${
                  msg.sender === "admin"
                    ? "bg-blue-200 text-blue-900 text-right"
                    : "bg-gray-300 text-gray-900 text-left"
                }`}
              >
                <small>{msg.sender === "admin" ? "You" : "Student"}</small>
                <p>{msg.text}</p>
                <small className="text-xs text-gray-600">
                  {new Date(msg.timestamp).toLocaleString()}
                </small>
              </div>
            ))}

            <input
              type="text"
              className="w-full border p-2 mt-2"
              placeholder="Type your reply"
              value={replyMessages[studentId] || ""}
              onChange={(e) =>
                setReplyMessages((prev) => ({
                  ...prev,
                  [studentId]: e.target.value,
                }))
              }
            />
            <button
              onClick={() => handleSendReply(studentId)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Reply
            </button>
          </div>
        ))}
      </section>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
