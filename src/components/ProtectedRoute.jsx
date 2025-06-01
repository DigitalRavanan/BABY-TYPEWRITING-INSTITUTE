// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { Navigate } from "react-router-dom";
import { ref, get } from "firebase/database";

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const userEmail = user.email;

      if (role === "admin") {
        // Only allow specific admin emails
        const adminEmails = ["vijayanharish525@gmail.com"];
        setAuthorized(adminEmails.includes(userEmail));
      } else if (role === "student") {
        const snap = await get(ref(db, `students/${user.uid}`));
        const student = snap.val();
        setAuthorized(student && student.approved);
      } else {
        setAuthorized(true); // No specific role required
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return authorized ? children : <Navigate to="/" />;
}
