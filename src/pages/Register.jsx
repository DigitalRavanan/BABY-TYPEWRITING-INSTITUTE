import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    course: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const db = getDatabase();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await set(ref(db, "students/" + user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        approved: false, // Admin will approve later
        attendance: {},
        leaveRequests: [],
        messages: [],
        personalDetails: {
          phone: formData.phone,
        },
      });

      alert("Registered successfully! Waiting for admin approval.");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Register for a Course</h2>
      <form onSubmit={handleRegister} className="space-y-4 bg-white shadow p-6 rounded-2xl">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="course"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Course</option>
          <option value="English Typewriting">English Typewriting</option>
          <option value="Tamil Typewriting">Tamil Typewriting</option>
          <option value="Basic Computer Skills">Basic Computer Skills</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
