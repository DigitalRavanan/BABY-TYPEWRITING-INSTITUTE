import React, { useEffect, useState } from "react";
import { getDatabase, ref, push } from "firebase/database";  // Correct import
import { auth } from "../firebase";

const ProfileUpdate = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    // add other fields you want
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile from Firestore on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert("No user logged in");
        setLoading(false);
        return;
      }
      const docRef = doc(db, "students", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log("No profile found, you can create one.");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle form submit: update Firestore document
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("No user logged in");
      return;
    }
    try {
      await setDoc(doc(db, "students", user.uid), profile, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Full Name</label>
        <input
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2 font-medium">Father's Name</label>
        <input
          name="fatherName"
          value={profile.fatherName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2 font-medium">Phone</label>
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Add more fields as needed */}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
