import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";  // import db here
import { ref, get, set } from "firebase/database";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const AttendancePage = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = auth.currentUser;
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!user) {
      navigate("/Login");
      return;
    }

    // Use `db` here instead of `database`
    const attendanceRef = ref(db, `attendance/${user.uid}/${today}`);

    get(attendanceRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCheckInTime(data.checkIn || null);
        setCheckOutTime(data.checkOut || null);
      }
      setLoading(false);
    });
  }, [user, today, navigate]);

  const handleCheckIn = async () => {
    const now = new Date().toLocaleTimeString();

    const attendanceRef = ref(db, `attendance/${user.uid}/${today}/checkIn`);
    await set(attendanceRef, now);
    setCheckInTime(now);
  };

  const handleCheckOut = async () => {
    const now = new Date().toLocaleTimeString();

    const attendanceRef = ref(db, `attendance/${user.uid}/${today}/checkOut`);
    await set(attendanceRef, now);
    setCheckOutTime(now);
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading attendance...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Today's Attendance</h2>

        <p className="mb-4 text-gray-800">Date: {today}</p>

        <div className="mb-6 space-y-2">
          <p>
            ✅ <strong>Check-In Time:</strong>{" "}
            {checkInTime ? checkInTime : "Not yet checked in"}
          </p>
          <p>
            ✅ <strong>Check-Out Time:</strong>{" "}
            {checkOutTime ? checkOutTime : "Not yet checked out"}
          </p>
        </div>

        {!checkInTime && (
          <button
            onClick={handleCheckIn}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold mb-4"
          >
            Check In
          </button>
        )}

        {checkInTime && !checkOutTime && (
          <button
            onClick={handleCheckOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
          >
            Check Out
          </button>
        )}

        {checkInTime && checkOutTime && (
          <p className="text-green-700 mt-4 font-semibold">✅ You’ve completed attendance for today!</p>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
