import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  ref,
  onValue,
  update,
  push,
  set,
  get,
  child,
} from "firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [leaveReason, setLeaveReason] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [updatingDetails, setUpdatingDetails] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      navigate("/login");
      return;
    }

    // Load student data
    const userRef = ref(db, `students/${uid}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
        setPersonalDetails({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      }
    });

    // Load today's attendance
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const attendanceRef = ref(db, `attendance/${uid}/${today}`);
    onValue(attendanceRef, (snapshot) => {
      setAttendance(snapshot.val());
    });

    // Load messages (student-admin chat)
    const messagesRef = ref(db, `messages/${uid}`);
    onValue(messagesRef, (snapshot) => {
      const msgs = [];
      snapshot.forEach((childSnap) => {
        msgs.push(childSnap.val());
      });
      setMessages(msgs);
    });
  }, [uid, navigate]);

  // Mark Check-in
  const handleCheckIn = () => {
    if (!uid) return;
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toLocaleTimeString();
    set(ref(db, `attendance/${uid}/${today}`), {
      checkIn: now,
      checkOut: attendance?.checkOut || null,
    });
  };

  // Mark Check-out
  const handleCheckOut = () => {
    if (!uid) return;
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toLocaleTimeString();
    set(ref(db, `attendance/${uid}/${today}`), {
      checkIn: attendance?.checkIn || null,
      checkOut: now,
    });
  };

  // Submit Leave Request
  const handleLeaveRequest = () => {
    if (!leaveReason.trim()) return alert("Please enter leave reason.");
    const leaveRef = push(ref(db, `leaves/${uid}`));
    set(leaveRef, {
      reason: leaveReason,
      status: "pending",
      date: new Date().toISOString(),
    });
    setLeaveReason("");
    alert("Leave request sent.");
  };

  // Send Message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const messagesRef = push(ref(db, `messages/${uid}`));
    set(messagesRef, {
      text: newMessage,
      sender: "student",
      timestamp: new Date().toISOString(),
    });
    setNewMessage("");
  };

  // Update personal details
  const handleUpdateDetails = () => {
    if (!uid) return;
    update(ref(db, `students/${uid}`), personalDetails);
    setUpdatingDetails(false);
    alert("Personal details updated.");
  };

  // Logout
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Welcome, {userData.name}</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">Course Details</h3>
        <p>{userData.course || "No course enrolled"}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">Attendance</h3>
        <p>Check-in: {attendance?.checkIn || "Not marked"}</p>
        <p>Check-out: {attendance?.checkOut || "Not marked"}</p>
        <button
          onClick={handleCheckIn}
          className="mr-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Check Out
        </button>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">Leave Request</h3>
        <textarea
          className="w-full border p-2"
          rows={3}
          value={leaveReason}
          onChange={(e) => setLeaveReason(e.target.value)}
          placeholder="Enter leave reason"
        />
        <button
          onClick={handleLeaveRequest}
          className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Submit Leave Request
        </button>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">Messages</h3>
        <div
          className="border p-3 max-h-48 overflow-y-auto bg-gray-50"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {messages.length === 0 && <p>No messages yet.</p>}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-1 p-2 rounded ${
                msg.sender === "student"
                  ? "bg-blue-200 text-blue-900 text-right"
                  : "bg-gray-300 text-gray-900 text-left"
              }`}
            >
              <small>{msg.sender === "student" ? "You" : "Admin"}</small>
              <p>{msg.text}</p>
              <small className="text-xs text-gray-600">
                {new Date(msg.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="w-full border p-2 mt-2"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">Personal Details</h3>
        {!updatingDetails ? (
          <div>
            <p><strong>Name:</strong> {personalDetails.name}</p>
            <p><strong>Email:</strong> {personalDetails.email}</p>
            <p><strong>Phone:</strong> {personalDetails.phone}</p>
            <button
              onClick={() => setUpdatingDetails(true)}
              className="mt-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Update Details
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full border px-3 py-2"
              value={personalDetails.name}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              className="w-full border px-3 py-2"
              value={personalDetails.email}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, email: e.target.value })
              }
              placeholder="Email"
              disabled
            />
            <input
              type="tel"
              className="w-full border px-3 py-2"
              value={personalDetails.phone}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, phone: e.target.value })
              }
              placeholder="Phone"
            />
            <button
              onClick={handleUpdateDetails}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setUpdatingDetails(false)}
              className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
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
