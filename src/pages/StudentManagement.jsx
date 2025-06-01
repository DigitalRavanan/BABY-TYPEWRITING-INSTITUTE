import React, { useEffect, useState } from "react";
import { getDatabase, ref, push } from "firebase/database";  // Correct import
import { auth } from "../firebase";

const AdminStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editData, setEditData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const studentsCollection = collection(db, "students");
        const snapshot = await getDocs(studentsCollection);
        const studentsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  // Delete student by doc id
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        alert("Failed to delete student: " + error.message);
      }
    }
  };

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudentId(student.id);
    setEditData({ fullName: student.fullName || "", email: student.email || "" });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingStudentId(null);
    setEditData({ fullName: "", email: "" });
  };

  // Handle input changes during edit
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save updated student data
  const handleSave = async () => {
    try {
      const studentRef = doc(db, "students", editingStudentId);
      await updateDoc(studentRef, editData);

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudentId ? { ...student, ...editData } : student
        )
      );

      setEditingStudentId(null);
      setEditData({ fullName: "", email: "" });
      alert("Student updated successfully!");
    } catch (error) {
      alert("Failed to update student: " + error.message);
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Student Management</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-indigo-50">
                <td className="border border-gray-300 p-2">
                  {editingStudentId === student.id ? (
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    student.fullName || "N/A"
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingStudentId === student.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    student.email || "N/A"
                  )}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  {editingStudentId === student.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminStudentManagement;
