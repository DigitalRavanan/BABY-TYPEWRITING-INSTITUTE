import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">BABY TYPEWRITING INSTITUTE</h1>
        <p className="text-lg mt-4 text-gray-700">
          Learn English, Tamil Typewriting, and Basic Computer Skills with us.
        </p>
        <Link to="/courses">
          <button className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-300">
            Explore Courses
          </button>
        </Link>
      </section>

      {/* Highlights Section */}
      <section className="py-12 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-800">English Typewriting</h3>
            <p className="text-sm text-gray-600 mt-2">
              Learn touch typing and increase your typing speed in English.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-800">Tamil Typewriting</h3>
            <p className="text-sm text-gray-600 mt-2">
              Master Tamil typewriting for exams and professional work.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-800">Basic Computer Skills</h3>
            <p className="text-sm text-gray-600 mt-2">
              Get introduced to MS Office, Internet, Email, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12 px-4 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">What Our Students Say</h2>
        <blockquote className="italic text-gray-700 max-w-2xl mx-auto">
          “I improved my typing speed from 20 WPM to 60 WPM in just 2 months!
          Highly recommend this institute.” – Priya
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Baby Typewriting Institute. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
