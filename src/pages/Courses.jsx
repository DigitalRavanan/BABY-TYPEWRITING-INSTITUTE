import React from "react";

export default function Courses() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Our Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-2">English Typewriting</h3>
          <p>Learn English typewriting with professional guidance. Suitable for beginners and advanced learners.</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-2">Tamil Typewriting</h3>
          <p>Master Tamil typewriting skills with the help of our experienced instructors.</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-2">Basic Computer Skills</h3>
          <p>Develop essential computer knowledge including typing, internet use, MS Office, and more.</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-2">Typing Speed Improvement</h3>
          <p>Special sessions to boost your typing speed and accuracy using modern software tools.</p>
        </div>
      </div>
    </div>
  );
}
