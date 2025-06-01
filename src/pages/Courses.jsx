import React from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "English Typewriting",
    description: "Touch typing to improve speed and accuracy.",
  },
  {
    title: "Tamil Typewriting",
    description: "Master Tamil typing for exams and jobs.",
  },
  {
    title: "Basic Computer Skills",
    description: "Learn MS Office, Email, Browsing & more.",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-8 font-sans">
      <h1 className="text-4xl font-extrabold text-yellow-900 text-center mb-12">Available Courses</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
            <Link to="/register">
              <button className="mt-6 w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105">
                Enroll Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
